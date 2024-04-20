"use client";

import { useToast } from "@/components/ui/use-toast";
import { dataUrl, getImageSize } from "@/lib/utils";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

import Image from "next/image";

type MediaUploaderProps = {
  onvalueChange: (value: any) => void;
  setImage: React.Dispatch<any>;
  image: any;
  type: string;
  publicId: string;
};

const MediaUploader = ({
  onvalueChange,
  setImage,
  image,
  type,
  publicId,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccess = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onvalueChange(result?.info?.public_id);

    toast({
      title: "Image uploaded successfully ",
      description: "1 credit was deducted from your balance",
      duration: 3000,
      className: "success-toast",
    });
  };

  const onUploadError = (error: any) => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again later",
      duration: 3000,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="ist_Imaginify"
      options={{ multiple: false }}
      onSuccess={onUploadSuccess}
      onError={onUploadError}
    >
      {({ open }) => {
        return (
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            {publicId ? (
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            ) : (
              <div className="media-uploader_cta" onClick={() => open()}>
                <div className="media-uploader_cta-image">
                  <Image
                    src="/assets/icons/add.svg"
                    alt="upload"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="p-14-medium"> Click here to upload image </p>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default MediaUploader;
