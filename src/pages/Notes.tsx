import Layout from "@/components/Layout";

const Notes = () => {
  const notes = [
    {
      id: 1,
      date: "2024-03-16",
      content: "The best ideas come not when we're trying to think, but when we're doing something else entirely. Walking, washing dishes, watching the rain. The mind needs space to wander."
    },
    {
      id: 2,
      date: "2024-03-10",
      content: "The light through the window reminds me that every day is a gift we unwrap slowly."
    },
    {
      id: 3,
      date: "2024-03-08",
      content: "Read something today about how we underestimate what we can do in ten years and overestimate what we can do in one. This feels true for almost everything worth doing."
    },
    {
      id: 4,
      date: "2024-03-03",
      content: "Sometimes the most productive thing you can do is rest."
    },
    {
      id: 5,
      date: "2024-02-27",
      content: "Noticed how the quality of questions we ask determines the quality of our lives. Not in a productivity-hack way, but in a genuine curiosity way."
    },
    {
      id: 6,
      date: "2024-02-22",
      content: "Coffee tastes better when you're not rushing. This might be a metaphor for everything."
    }
  ];

  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Notes</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Short, spontaneous thoughts — a public notebook of moments and observations.
          </p>
        </div>

        <div className="space-y-10">
          {notes.map((note, index) => (
            <article 
              key={note.id} 
              className="fade-in border-l-2 border-border pl-6 py-2"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <time className="text-sm text-muted-foreground block mb-3">
                {note.date}
              </time>
              <p className="leading-relaxed text-foreground/90">
                {note.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notes;
