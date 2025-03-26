export default function RendererEmbed({ src }: { src: string }) {
  return (
    <iframe
      allow="accelerometer; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
      src={src}
      className="w-[100%] h-[100%] rounded-inherit"
    />
  );
}
