import { clerkClient } from "@clerk/nextjs/server";
import { getImage, deleteImage } from "~/server/queries";
import { Button } from "./ui/button"

export default async function FullPageImageView(props: { id: number }) {

    const idAsNumber = Number(props.id);
    if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

    const image = await getImage(props.id)

    const uploaderInfo = await clerkClient.users.getUser(image.userId)

        return (
            <div className="flex w-full h-full min-w-0 items-center justify-center">
                <div className="flex flex-shrink justify-center items-center">
                    <img src={image.url} className="object-contain flex-shrink" />
                </div>

                <div className="flex flex-col w-48 flex-shrink-0 pl-2">
                    <div className="text-lg border-b text-center p-2">{image.name}</div>

                    <div className="flex flex-col p-2">
                        <span>Uploaded by:</span>
                        <span>{uploaderInfo.fullName}</span>
                    </div>

                    <div className="flex flex-col p-2">
                        <span>Created on:</span>
                        <span>{new Date(image.createdAt).toLocaleString()}</span>
                    </div>

                    <div className="flex flex-col p-2">
                        <form action={async () => {
                            "use server";
                            await deleteImage(idAsNumber)
                        }}>
                            <Button type="submit" variant="destructive" >Delete</Button>
                        </form>
                    </div>
                </div>


            </div>

);

}