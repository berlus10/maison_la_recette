import Image from 'next/image';

const experts = [
  {
    surname: 'Gomez',
    firstName: 'Guillaume',
    image: '/studio/experts/Guilaume.png',
  },
  { surname: 'Sammut', firstName: 'Nadia', image: '/studio/experts/Nadia.png' },
  {
    surname: 'Têtedoie',
    firstName: 'Christian',
    image: '/studio/experts/Christian.png',
  },
  {
    surname: 'Labro',
    firstName: 'Camille',
    image: '/studio/experts/Camille.png',
  },
  {
    surname: 'Tavernier',
    firstName: 'Boris',
    image: '/studio/experts/boris.png',
  },
];

export function ExpertStrip({
  title = 'Des experts et professionnels qui nous expliquent :',
}: {
  title?: string;
}) {
  return (
    <div>
      <p className="mb-4 text-base text-[#2B2119] sm:text-lg lg:text-xl">
        {title}
      </p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {experts.map((expert) => (
          <li
            key={expert.surname}
            className="flex min-h-[110px] flex-col items-center justify-center rounded-[20px] bg-[#FBF8F2] px-2 py-3 text-center text-[#2B2119]"
          >
            <Image
              src={expert.image}
              alt=""
              aria-hidden="true"
              width={99}
              height={66}
              className="mb-1 h-[54px] w-[81px] rounded-xl object-cover"
            />
            <span className="leading-tight font-medium">{expert.surname}</span>
            <span className="text-sm leading-tight">{expert.firstName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
