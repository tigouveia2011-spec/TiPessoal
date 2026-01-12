import React, { useState, useEffect } from 'react';
import { Test, StudySession, ViewState, ClassSession } from './types';
import { generateStudyPlan } from './services/gemini';
import { supabase } from './services/supabase';
import { INITIAL_CLASSES, INITIAL_TESTS, INITIAL_STUDY_SESSIONS } from './constants';
import ScheduleView from './components/ScheduleView';
import AddTestForm from './components/AddTestForm';
import HandballView from './components/HandballView';
import HomeView from './components/HomeView';
import { ArrowLeft, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  
  // Data State
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  
  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- FETCH DATA FROM SUPABASE ---
  useEffect(() => {
    fetchAndSeedData();
  }, []);

  const fetchAndSeedData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Classes/Events
      let { data: classesData, error: classesError } = await supabase.from('classes').select('*');
      
      // SEEDING: Se a tabela de aulas estiver vazia, inserir dados iniciais
      if (classesData && classesData.length === 0) {
         console.log("Base de dados vazia. A semear dados iniciais...");
         
         // Inserir Aulas
         const classesPayload = INITIAL_CLASSES.map(c => ({
            day_of_week: c.dayOfWeek,
            start_time: c.startTime,
            end_time: c.endTime,
            subject: c.subject,
            room: c.room,
            color: c.color,
            date: c.date,
            stats: c.stats
         }));
         const { data: insertedClasses, error: insertError } = await supabase.from('classes').insert(classesPayload).select();
         if (!insertError && insertedClasses) classesData = insertedClasses;

         // Inserir Testes e Mapear IDs (porque o DB usa UUIDs)
         const testIdMap: Record<string, string> = {};
         const testsPayload = INITIAL_TESTS.map(t => ({
             subject: t.subject,
             topic: t.topic,
             date: t.date,
             start_time: t.startTime,
             difficulty: t.difficulty
         }));
         
         // Inserir um a um para mapear o ID antigo (do constants.ts) para o novo UUID
         const newTests: any[] = [];
         for (let i = 0; i < INITIAL_TESTS.length; i++) {
             const oldTest = INITIAL_TESTS[i];
             const { data: insertedTest } = await supabase.from('tests').insert({
                 subject: oldTest.subject,
                 topic: oldTest.topic,
                 date: oldTest.date,
                 start_time: oldTest.startTime,
                 difficulty: oldTest.difficulty
             }).select().single();
             
             if (insertedTest) {
                 testIdMap[oldTest.id] = insertedTest.id;
                 newTests.push(insertedTest);
             }
         }

         // Inserir Sessões de Estudo com os novos IDs dos testes
         const sessionsPayload = INITIAL_STUDY_SESSIONS.map(s => {
             const newTestId = testIdMap[s.testId];
             if (!newTestId) return null;
             return {
                 test_id: newTestId,
                 date: s.date,
                 start_time: s.startTime,
                 focus_topic: s.focusTopic,
                 duration_minutes: s.durationMinutes,
                 completed: s.completed
             };
         }).filter(Boolean);

         await supabase.from('study_sessions').insert(sessionsPayload as any[]);
      }

      // Re-fetch para garantir consistência
      const { data: finalClasses } = await supabase.from('classes').select('*');
      const { data: finalTests } = await supabase.from('tests').select('*');
      const { data: finalSessions } = await supabase.from('study_sessions').select('*');

      if (classesError) throw classesError;

      // Transform DB Snake_case to CamelCase for Frontend
      const formattedClasses: ClassSession[] = (finalClasses || []).map((c: any) => ({
        id: c.id,
        dayOfWeek: c.day_of_week,
        startTime: c.start_time,
        endTime: c.end_time,
        subject: c.subject,
        room: c.room,
        color: c.color,
        date: c.date,
        stats: c.stats
      }));

      const formattedTests: Test[] = (finalTests || []).map((t: any) => ({
        id: t.id,
        subject: t.subject,
        topic: t.topic,
        date: t.date,
        startTime: t.start_time,
        difficulty: t.difficulty
      }));

      const formattedSessions: StudySession[] = (finalSessions || []).map((s: any) => ({
        id: s.id,
        testId: s.test_id,
        date: s.date,
        startTime: s.start_time,
        focusTopic: s.focus_topic,
        durationMinutes: s.duration_minutes,
        completed: s.completed
      }));

      setClasses(formattedClasses);
      setTests(formattedTests);
      setStudySessions(formattedSessions);

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      alert("Erro de conexão com o Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleSaveTest = async (newTest: Test, newSessions: StudySession[]) => {
    try {
      // 1. Insert Test
      const { data: testData, error: testError } = await supabase.from('tests').insert([{
        subject: newTest.subject,
        topic: newTest.topic,
        date: newTest.date,
        start_time: newTest.startTime,
        difficulty: newTest.difficulty
      }]).select().single();

      if (testError) throw testError;

      // 2. Insert Sessions (Need the real DB ID from the test)
      const sessionsToInsert = newSessions.map(s => ({
        test_id: testData.id, // Use ID from DB
        date: s.date,
        start_time: s.startTime,
        focus_topic: s.focusTopic,
        duration_minutes: s.durationMinutes,
        completed: false
      }));

      const { data: sessionData, error: sessionError } = await supabase.from('study_sessions').insert(sessionsToInsert).select();
      if (sessionError) throw sessionError;

      // 3. Update Local State (Refetch)
      fetchAndSeedData(); 
      setView('schedule');

    } catch (error) {
      console.error(error);
      alert("Erro ao guardar teste.");
    }
  };

  const handleSaveEvent = async (newEvent: ClassSession) => {
    try {
      const { error } = await supabase.from('classes').insert([{
        day_of_week: newEvent.dayOfWeek,
        start_time: newEvent.startTime,
        end_time: newEvent.endTime,
        subject: newEvent.subject,
        room: newEvent.room,
        color: newEvent.color,
        date: newEvent.date,
        stats: newEvent.stats
      }]);

      if (error) throw error;
      
      fetchAndSeedData();
      setView('handball');
    } catch (error) {
      console.error(error);
      alert("Erro ao guardar evento.");
    }
  };

  const handleUpdateStats = async (eventId: string, newStats: { goals: number; exclusions: number }) => {
    // Optimistic Update
    setClasses(prev => prev.map(c => 
      c.id === eventId ? { ...c, stats: newStats } : c
    ));

    try {
      const { error } = await supabase.from('classes').update({ stats: newStats }).eq('id', eventId);
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao atualizar stats:", error);
    }
  };

  const toggleSessionCompletion = async (sessionId: string) => {
    const session = studySessions.find(s => s.id === sessionId);
    if (!session) return;
    
    const newStatus = !session.completed;

    // Optimistic Update
    setStudySessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, completed: newStatus } : s
    ));

    try {
      const { error } = await supabase.from('study_sessions').update({ completed: newStatus }).eq('id', sessionId);
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao atualizar sessão:", error);
    }
  };

  const handleRegeneratePlan = async (testId: string) => {
    const testToUpdate = tests.find(t => t.id === testId);
    if (!testToUpdate) return;

    setIsRegenerating(true);
    try {
        // 1. Delete future incomplete sessions
        const { error: deleteError } = await supabase
          .from('study_sessions')
          .delete()
          .eq('test_id', testId)
          .eq('completed', false);
        
        if (deleteError) throw deleteError;

        // 2. Generate NEW plan
        const newPlanRaw = await generateStudyPlan(testToUpdate, classes);
        
        // Fix: Explicitly type 'item' to avoid implicit 'any' error by using the expected type
        const sessionsToInsert = newPlanRaw.map((item: Omit<StudySession, 'id' | 'testId' | 'completed'>) => ({
            test_id: testId,
            date: item.date,
            start_time: item.startTime,
            focus_topic: item.focusTopic,
            duration_minutes: item.durationMinutes,
            completed: false
        }));

        const { error: insertError } = await supabase.from('study_sessions').insert(sessionsToInsert);
        if (insertError) throw insertError;

        await fetchAndSeedData();
        alert('Plano de estudo atualizado com sucesso!');
    } catch (error) {
        alert('Erro ao atualizar plano. Tenta novamente.');
        console.error(error);
    } finally {
        setIsRegenerating(false);
    }
  };

  // Dynamic Header Styles
  const getHeaderStyle = () => {
    if (view === 'handball') return 'bg-slate-900 text-white border-slate-800';
    if (view === 'schedule' || view === 'add-test' || view === 'add-event') return 'bg-white text-gray-900 border-gray-200';
    return 'bg-white/50 backdrop-blur-md border-transparent'; 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-indigo-600 gap-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="font-medium animate-pulse">A conectar ao Supabase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans pb-20 md:pb-10 relative">
      
      {/* Background */}
      <div className="fixed inset-0 z-[-1] transition-all duration-700 ease-in-out">
        {view === 'home' ? (
          <>
             <div className="hidden md:block absolute inset-0 bg-gray-100">
                <div className="absolute top-0 right-0 w-[55%] h-full bg-slate-950 transform -skew-x-12 origin-top-right border-l-2 border-slate-800 shadow-2xl"></div>
             </div>
             <div className="md:hidden absolute inset-0 flex flex-col">
                <div className="h-[45%] bg-gray-100"></div>
                <div className="h-[55%] bg-slate-950 border-t-2 border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"></div>
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-teal-500/5 pointer-events-none mix-blend-overlay"></div>
          </>
        ) : view === 'handball' ? (
           <div className="absolute inset-0 bg-slate-950"></div>
        ) : (
           <div className="absolute inset-0 bg-gray-50"></div>
        )}
      </div>

      {/* Header */}
      <header className={`shadow-sm border-b sticky top-0 z-50 transition-all duration-300 ${getHeaderStyle()}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {view !== 'home' && (
              <button 
                onClick={() => setView(view === 'add-event' ? 'handball' : view === 'add-test' ? 'schedule' : 'home')} 
                className={`p-1.5 rounded-full hover:bg-opacity-10 hover:bg-black transition-colors ${view === 'handball' ? 'text-white' : 'text-gray-600'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {view === 'schedule' && (
             <button 
               onClick={() => setView('add-test')}
               className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-bold shadow-md transition-all"
             >
               + Teste
             </button>
          )}

          {view === 'handball' && (
             <button 
               onClick={() => setView('add-event')}
               className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-sm font-bold shadow-md transition-all"
             >
               + Jogo
             </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {view === 'home' && (
          <HomeView 
            onSelectSchool={() => setView('schedule')}
            onSelectHandball={() => setView('handball')}
          />
        )}

        {view === 'schedule' && (
          <div className="animate-fade-in">
             {isRegenerating && (
                <div className="fixed inset-0 bg-white/80 z-[60] flex flex-col items-center justify-center backdrop-blur-sm">
                   <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                   <h3 className="text-lg font-bold text-slate-800">A reotimizar plano...</h3>
                   <p className="text-slate-500">A ajustar horários à tua agenda atual.</p>
                </div>
             )}
            <ScheduleView 
              classes={classes} 
              tests={tests}
              studySessions={studySessions}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onToggleSession={toggleSessionCompletion}
              onRegeneratePlan={handleRegeneratePlan}
            />
          </div>
        )}

        {view === 'handball' && (
          <div className="animate-fade-in text-white">
            <HandballView 
              events={classes}
              onAddEvent={() => setView('add-event')}
              onUpdateStats={handleUpdateStats}
            />
          </div>
        )}

        {(view === 'add-test' || view === 'add-event') && (
          <div className="animate-slide-up max-w-5xl mx-auto">
            <AddTestForm 
              formType={view === 'add-test' ? 'test' : 'event'}
              classes={classes}
              onSave={handleSaveTest}
              onSaveEvent={handleSaveEvent}
              onCancel={() => setView(view === 'add-test' ? 'schedule' : 'handball')} 
            />
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;