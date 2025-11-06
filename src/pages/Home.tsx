import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Home = () => {
  const latestPosts = [
    {
      id: 1,
      type: "essay",
      title: "On Silence and Stillness",
      date: "2024-03-15",
      excerpt: "There's a particular quality to silence that we've forgotten in the age of constant noise. It's not the absence of sound, but the presence of space..."
    },
    {
      id: 2,
      type: "note",
      title: "Morning Thoughts",
      date: "2024-03-10",
      excerpt: "The light through the window reminds me that every day is a gift we unwrap slowly."
    },
    {
      id: 3,
      type: "essay",
      title: "Technology as a Mirror",
      date: "2024-03-05",
      excerpt: "The tools we build reflect who we are. They're not neutral — they carry our values, our assumptions, our hopes and fears..."
    }
  ];

  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-balance">
            Hi, feel the moments with me
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This is a quiet corner of the internet where I think out loud about technology, 
            philosophy, and what it means to live deliberately in a world of constant distraction.
          </p>
        </div>

        <div className="space-y-12">
          <h2 className="text-2xl font-light text-muted-foreground">Latest writings</h2>
          
          {latestPosts.map((post, index) => (
            <article 
              key={post.id} 
              className="fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/${post.type}s/${post.id}`} className="block">
                <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span className="capitalize">{post.type}</span>
                </div>
                <h3 className="text-xl font-normal mb-3 group-hover:text-accent transition-colors ambient-glow">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}

          <div className="pt-8">
            <Link 
              to="/essays" 
              className="ambient-glow text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all writings →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
