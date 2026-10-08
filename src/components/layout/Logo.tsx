import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/brand/logo-maison-la-recette.svg"
      alt=""
      aria-hidden="true"
      width={372}
      height={94}
      priority
      className="h-auto w-[150px] sm:w-[180px] xl:w-[200px]"
    />
  );
}
