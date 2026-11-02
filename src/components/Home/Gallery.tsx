
import GalleryCard from "../shared/GalleryCard";



interface IGalleryItem {
  image: string;
  tag: string;
  title: string;
  location: string;
  completedDate: string;
  participants: number;
  featured?: boolean;
}

const galleryItems: IGalleryItem[] = [
  {
    image: "https://i.ibb.co.com/1JfD3qHB/tree.webp",
    tag: "For Save Earth",
    title: "Tree Plantation Drive",
    location: "Mirpur 10, Dhaka",
    completedDate: "2026-06-05",
    participants: 120,
    featured: true,
  },
  {
    image: "https://i.ibb.co.com/JFgBkJZm/free-education.webp",
    tag: "Learn together",
    title: "Community Book Fair",
    location: "Dhanmondi, Dhaka",
    completedDate: "2026-02-21",
    participants: 85,
  },
  {
    image: "https://i.ibb.co.com/DP38GX4v/lakedside-cleanup.jpg",
    tag: "Clean city",
    title: "Lakeside Clean-up Day",
    location: "Gulshan Lake, Dhaka",
    completedDate: "2026-08-14",
    participants: 64,
  },
  {
    image: "https://i.ibb.co.com/CsXRs1p4/blood-donation.webp",
    tag: "Give blood, save lives",
    title: "Blood Donation Camp",
    location: "Uttara, Dhaka",
    completedDate: "2026-04-10",
    participants: 210,
  },
  {
    image: "https://i.ibb.co.com/qMVZcX3m/winter-cloth-relief.jpg",
    tag: "Warmth from roadside people",
    title: "Winter Relief Drive",
    location: "Savar, Dhaka",
    completedDate: "2026-01-18",
    participants: 95,
  },
];

const getSpan = (index: number, total: number) => {
  const pattern = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
  ];

  if (index === total - 1 && index % 4 === 0) return "lg:col-span-3";

  return pattern[index % 4];
};



const Gallery = () => {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground font-secondary sm:text-4xl">
            Moments from our events
          </h2>
          <p className="mt-4 text-muted-foreground">
            A look back at the gatherings that brought people together and made
            a difference.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="mt-14 grid grid-cols-1 auto-rows-72 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-88 lg:gap-6">
          {galleryItems.map((item, ind: number) => (
            <div key={ind} className={getSpan(ind, galleryItems.length)}>
              <GalleryCard event={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
