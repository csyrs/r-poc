export default function RendererImage({ src }: { src: string }) {
  return (
    <img src={src} className="max-w-none w-[100%] h-[100%] rounded-inherit" />
  );
}
