import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-12">Тухай</h1>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-2xl bg-muted overflow-hidden max-w-xs mx-auto md:max-w-none flex items-center justify-center p-12">
                <img
                  src="/logo.png"
                  alt="Chilute"
                  className="max-h-full w-auto object-contain opacity-80 block dark:hidden"
                />
                <img
                  src="/logo-dark.png"
                  alt="Chilute"
                  className="max-h-full w-auto object-contain opacity-80 hidden dark:block"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6 text-lg leading-relaxed text-foreground/90">
              <p>
                Бид бодохыг их хийдэг хүмүүс. Бодох гэдэг нь бидний амьтнаас ялгарах гол чанаруудын нэг яах аргагаүй мөн байх. Хүн сайн байсан ч муу байсан ч ямар нэг зүйл үргэлж боддог л байх. 
              </p>

              <p>
                Харин энэ орон зай бол 8 тэрбумын нэг өнцөг нь болсон хүмүүний бодлынхоо тухай бичих тэмдэглэл юм. Зөв эсвэл буруу гэдэг шүүн тунгаах хэсгээсээ илүү, миний дотор болж буй тэр бодролууд чухам хаа хүрж болохыг мэдэхийг хүссэн тэмдэглэл гэж хэлж болно.
              </p>

              <p>
                Чилүтэ гэдэг үгний утга нь "Чөлөөтэй" гэдэг үгний авиалбараас санаа авсан үүсмэл нэр бөгөөд өөрийн хамаарагдах болон хязгаарлагдах бүсчлэлээс гарсан хүнийг төсөөлөн бий болгосон хийсвэр дүр болно.
              </p>

              <p>
                Тиймээс таны бодолтой нийцсэн ч эс нийцсэн ч дүгнэлт хийх эрх нь таньд байгааг анзаарч, бичих эрх нь мөн надад байгааг тунгааж хүлээн аваарай.
              </p>

              <p>
                Хүндэтгэсэн, 
                Чилэтү
              </p>

            </div>
          </div>

          <div className="border-t border-border/50 pt-12">
            <div className="space-y-3 text-muted-foreground">
              <p className="text-sm">
                Вебсайтыг хиймэл оюунаар бүтээлгэж,
              </p>
              <p className="text-sm">
                Бичвэрийг хүний оюунаар бүтээв.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
