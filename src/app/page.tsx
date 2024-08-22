import Link from "next/link";
import { db } from "../server/db/index"
import Image from 'next/image'
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { getMyImages } from "../server/queries"

export const dynamic = "force-dynamic"

async function Images() {

  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-5 ml-5 justify-start p-5">
      {images.map((image, index) => (
        <div key={image.id} className="w-48 flex flex-col items-center">
          <div className="relative w-full h-48">
            <Link href={`/img/${image.id}`}>
            <Image 
              src={image.url} 
              layout="fill" 
              objectFit="cover" 
              alt={image.name} 
              className="rounded-lg"
            />
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            {image.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {

  return (
    <main className="">
      <SignedIn>
        <Images/>
      </SignedIn>
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">Please sign in above</div>
      </SignedOut>

    </main>
  );
}
