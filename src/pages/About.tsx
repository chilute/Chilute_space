import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="fade-in">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-12">Тухай</h1>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-2xl bg-muted overflow-hidden max-w-xs mx-auto md:max-w-none">
                <img
                  src="/placeholder.svg"
                  alt="Хөрөг"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6 text-lg leading-relaxed text-foreground/90">
              <p>
                Би технологи болон хүний туршлагын огтлолцлын талаар гүн гүнзгий боддог
                хүн. Бидний бүтээдэг хэрэгслүүд зөвхөн бидний хийдэг зүйлийг бус,
                бид хэн болохыг ч төлөвшүүлдэг гэдэгт би итгэдэг.
              </p>

              <p>
                Энэ сайт бол миний дуу хоолойгоо чанга гарган бодох оролдлого — гүн ухаан,
                технологи, мөн анхаарлыг минь мянган зүгт татах ертөнцөд ухамсартай
                амьдрах гэж юу болох тухай санаануудыг боловсруулах оролдлого юм.
              </p>

              <p>
                Гүнзгий судлах зүйл байвал би эссэ бичдэг, харин бүрэн дэлгэрэнгүй
                тайлбар шаардахгүй бодол төрвөл тэмдэглэл бичдэг. Хоёулаа л зайлшгүй
                хэрэгтэй санагддаг.
              </p>

              <p>
                Хэрэв та надтай холбогдмоор байвал интернэтийн энэ нам гүм буланд намайг
                чимээгүйхэн бодолд автсан байхыг олж харах болно. Хамгийн сайхан яриа
                заримдаа удаан хугацаанд, бичсэн үгсээр дамжин аажуухан өрнөдөг.
              </p>
            </div>
          </div>

          <div className="border-t border-border/50 pt-12">
            <h2 className="text-2xl font-light mb-6 text-muted-foreground">Колофон</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="text-sm">
                Энэ сайтыг зориудаар бүтээсэн — React, TypeScript, Tailwind CSS ашигласан.
                Үсгийн фонтыг Spectral-ээр, код хэсгийг JetBrains Mono-оор тохируулсан.
              </p>
              <p className="text-sm">
                Дизайны гүн ухаан энгийн: үгсийг амьсгалуулах. Шаардлагагүй нарийн
                төвөгтэй зүйл байхгүй, анхаарал татах заль мэх байхгүй. Зөвхөн нам гүм
                орон зайд бодолтой агуулга л байна.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
