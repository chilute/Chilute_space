import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Essays = () => {
  const essays = [
    {
      id: 1,
      title: "On Silence and Stillness",
      date: "2024-03-15",
      excerpt: "There's a particular quality to silence that we've forgotten in the age of constant noise. It's not the absence of sound, but the presence of space..."
    },
    {
      id: 3,
      title: "Technology as a Mirror",
      date: "2024-03-05",
      excerpt: "The tools we build reflect who we are. They're not neutral — they carry our values, our assumptions, our hopes and fears..."
    },
    {
      id: 4,
      title: "The Weight of Attention",
      date: "2024-02-28",
      excerpt: "Where we direct our attention shapes our reality. In a world designed to fragment our focus, choosing what to pay attention to is a radical act..."
    },
    {
      id: 5,
      title: "Walking as Meditation",
      date: "2024-02-20",
      excerpt: "There's wisdom in moving slowly through the world, in letting the rhythm of your steps quiet the mind..."
    }
  ];

  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Essays</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Longer-form reflections on technology, philosophy, and living intentionally.
          </p>
        </div>

        <div className="space-y-12">
          {essays.map((essay, index) => (
            <article 
              key={essay.id} 
              className="fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/essays/${essay.id}`} className="block">
                <time className="text-sm text-muted-foreground mb-2 block">
                  {essay.date}
                </time>
                <h2 className="text-2xl font-normal mb-3 group-hover:text-accent transition-colors ambient-glow">
                  {essay.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {essay.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Essays;
