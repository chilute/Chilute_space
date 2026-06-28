import { useEffect, useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { en } from "@blocknote/core/locales";
import { galleryApi } from "@/lib/api";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface BlockEditorProps {
  // Эхлэх агуулга (Markdown). Зөвхөн нэг удаа ачаална.
  initialMarkdown: string;
  // Засвар бүрт Markdown болгон буцаана.
  onChange: (markdown: string) => void;
}

const isDark = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

// Notion маягийн блок засварлагч. Агуулгыг Markdown-оор хадгална.
const BlockEditor = ({ initialMarkdown, onChange }: BlockEditorProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    isDark() ? "dark" : "light",
  );

  const editor = useCreateBlockNote({
    // Зураг чирэх / '/image' командаар Supabase storage руу хуулна.
    uploadFile: (file: File) => galleryApi.uploadImage(file),
    // Хоосон блокийн сануулга текстийг монголоор.
    dictionary: {
      ...en,
      placeholders: {
        ...en.placeholders,
        default: "Бичиж эхлэх, эсвэл командад '/' гэж бичнэ үү…",
      },
    },
  });

  // Эхний Markdown агуулгыг блок болгон ачаална.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!initialMarkdown.trim()) return;
      const blocks = await editor.tryParseMarkdownToBlocks(initialMarkdown);
      if (!cancelled) editor.replaceBlocks(editor.document, blocks);
    })();
    return () => {
      cancelled = true;
    };
    // editor нь mount бүрт нэг л удаа үүснэ.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  // Сайтын dark/light темтэй синк байлгана.
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setTheme(el.classList.contains("dark") ? "dark" : "light"),
    );
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const handleChange = async () => {
    const md = await editor.blocksToMarkdownLossy(editor.document);
    onChange(md);
  };

  return (
    // Хайрцаггүй, ил тод — гарчиг/дэд гарчигтай нэг гадаргуу болж нийлнэ.
    // BlockNote-ийн өөрийн 54px зүүн зай нь чирэх бариул/'+' товчид зориулагдсан.
    <div className="[&_.bn-editor]:min-h-[24rem] [&_.bn-editor]:!px-6 md:[&_.bn-editor]:!px-[54px]">
      <BlockNoteView editor={editor} theme={theme} onChange={handleChange} />
    </div>
  );
};

export default BlockEditor;
