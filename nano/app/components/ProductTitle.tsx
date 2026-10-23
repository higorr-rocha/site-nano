type ProductTitleProps = {
  title: string;
};

export default function ProductTitle({ title }: ProductTitleProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-black leading-tight tracking-[-0.04em] text-[#24298D] sm:text-3xl">
        {title}
      </h1>
    </div>
  );
}
