import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-12">About</h1>
          
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-2xl bg-muted overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Portrait" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6 text-lg leading-relaxed text-foreground/90">
              <p>
                I'm someone who thinks deeply about the intersection of technology and human 
                experience. I believe that the tools we create shape not just what we do, 
                but who we become.
              </p>
              
              <p>
                This site is my attempt to think out loud — to process ideas about philosophy, 
                technology, and what it means to live intentionally in a world that constantly 
                pulls our attention in a thousand directions.
              </p>
              
              <p>
                I write essays when I have something substantial to explore, and notes when a 
                thought strikes me that doesn't need a full treatment. Both feel necessary.
              </p>
              
              <p>
                If you'd like to connect, you can find me thinking quietly in this corner of 
                the internet. Sometimes the best conversations happen slowly, over time, through 
                written words.
              </p>
            </div>
          </div>

          <div className="border-t border-border/50 pt-12">
            <h2 className="text-2xl font-light mb-6 text-muted-foreground">Colophon</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="text-sm">
                This site is built with intention — using React, TypeScript, and Tailwind CSS. 
                The typography is set in Crimson Pro with code snippets in JetBrains Mono.
              </p>
              <p className="text-sm">
                The design philosophy is simple: let the words breathe. No unnecessary complexity, 
                no attention-grabbing gimmicks. Just thoughtful content in a calm space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
