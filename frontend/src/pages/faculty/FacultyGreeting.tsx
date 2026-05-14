// frontend/src/components/faculty/FacultyGreeting.tsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star, Quote } from 'lucide-react';

// Inspirational quotes from students
const studentQuotes = [
  {
    text: "Your guidance has been the lighthouse in our academic journey. Thank you for always being there!",
    from: "Anonymous Student",
    emoji: "🌟"
  },
  {
    text: "The best teachers don't give you answers, they show you where to look. You're truly inspiring!",
    from: "AI & ML Batch 2025",
    emoji: "📚"
  },
  {
    text: "Every lecture of yours feels like a TED talk - full of insights and inspiration!",
    from: "CSE Department",
    emoji: "🎯"
  },
  {
    text: "Thank you for believing in us even when we didn't believe in ourselves. You're the best!",
    from: "Project Team Alpha",
    emoji: "💪"
  },
  {
    text: "Your passion for teaching is contagious! You've made learning truly enjoyable.",
    from: "Web Development Class",
    emoji: "🔥"
  },
  {
    text: "The way you simplify complex topics is magical. Thank you for being an amazing mentor!",
    from: "Data Science Students",
    emoji: "✨"
  },
  {
    text: "You don't just teach subjects, you shape futures. Grateful to have you as our professor!",
    from: "Final Year Students",
    emoji: "🎓"
  },
  {
    text: "Your encouragement during tough times kept us going. You're more than a teacher, you're a mentor!",
    from: "Project Team Beta",
    emoji: "💐"
  },
  {
    text: "The knowledge and wisdom you share goes beyond textbooks. Truly life-changing!",
    from: "Computer Science Dept",
    emoji: "📖"
  },
  {
    text: "Thank you for making every class interactive and engaging. We look forward to each session!",
    from: "Morning Batch",
    emoji: "☀️"
  },
  {
    text: "Your constructive feedback has helped us grow tremendously. We couldn't ask for a better guide!",
    from: "Research Scholars",
    emoji: "📈"
  },
  {
    text: "The way you handle every student's query with patience is admirable. You're the best!",
    from: "Evening Batch",
    emoji: "🤗"
  },
  {
    text: "Your real-world examples make complex concepts crystal clear. Thank you for bridging the gap!",
    from: "Industry Connect Program",
    emoji: "🌍"
  },
  {
    text: "You've taught us that failures are just stepping stones to success. Grateful for your wisdom!",
    from: "Startup Incubation Cell",
    emoji: "🚀"
  },
  {
    text: "The way you celebrate our small victories makes us strive for bigger achievements!",
    from: "UG Students",
    emoji: "🏆"
  },
  {
    text: "Your dedication to teaching inspires us to be dedicated learners. Thank you for everything!",
    from: "PG Students",
    emoji: "💎"
  },
  {
    text: "You're not just teaching us subjects, you're preparing us for life. Forever grateful!",
    from: "Alumni Association",
    emoji: "🌺"
  },
  {
    text: "Your belief in our potential pushes us to achieve more than we thought possible!",
    from: "Competitive Coding Club",
    emoji: "⚡"
  },
  {
    text: "The way you connect with every student makes the classroom feel like a second home.",
    from: "Class Representative",
    emoji: "🏠"
  },
  {
    text: "Thank you for being the reason we love coming to college every day!",
    from: "First Year Students",
    emoji: "🎒"
  }
];

const FacultyGreeting: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(studentQuotes[0]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set random quote every 30 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * studentQuotes.length);
      setCurrentQuote(studentQuotes[randomIndex]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else if (hour < 20) setGreeting('Good Evening');
    else setGreeting('Good Night');
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#C3BEF0] to-[#CCA8E9] p-6 text-gray-800 shadow-xl mb-6">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-32 translate-y-32" />
      </div>
      
      <div className="relative z-10">
        {/* Greeting Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/30 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{greeting}, Professor! 👋</h2>
            <p className="text-gray-700 text-sm mt-0.5">Welcome to your faculty dashboard</p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="p-2 bg-white/50 rounded-full">
                <Quote className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 text-base leading-relaxed italic">
                "{currentQuote.text}"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span className="text-xs text-gray-600 font-medium">
                  — {currentQuote.from} {currentQuote.emoji}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Small indicator for rotating quotes */}
        <div className="flex justify-center gap-1 mt-3">
          {studentQuotes.slice(0, 5).map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1 h-1 rounded-full transition-all ${
                studentQuotes.indexOf(currentQuote) % 5 === idx 
                  ? 'bg-gray-700 w-2' 
                  : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyGreeting;