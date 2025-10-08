'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import ReactCrop from 'react-image-crop';

import Button from './Button';
import useCreatePost from '@/hooks/useCreatePost';

const createPostSchema = z.object({
  text_content: z.string().optional(),
});

const CreatePost = () => {
  const [files, setFiles] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const imgRef = useRef(null);

  const { mutate: createPost, isPending } = useCreatePost();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(createPostSchema),
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setImgSrc(URL.createObjectURL(file));
      setIsCropping(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    maxFiles: 4 - files.length,
  });

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleCropComplete = () => {
    if (completedCrop && imgRef.current) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
          const newFile = Object.assign(croppedFile, { preview: URL.createObjectURL(croppedFile) });
          setFiles(prev => [...prev, newFile]);
          setIsCropping(false);
          setImgSrc('');
        }
      }, 'image/jpeg');
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.text_content) {
      formData.append('text_content', data.text_content);
    }

    files.forEach(file => {
      formData.append('images', file);
    });

    if (!data.text_content && files.length === 0) {
        return; // Do not post if there is no content
    }

    createPost(formData, {
      onSuccess: () => {
        reset();
        setFiles([]);
      },
    });
  };

  return (
    <div className="w-full max-w-xl p-4 mx-auto my-4 bg-[var(--bg-secondary)] rounded-lg shadow-md">
      {isCropping && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
            >
              <img ref={imgRef} src={imgSrc} alt="Crop me" style={{ maxHeight: '80vh' }} />
            </ReactCrop>
            <div className="flex justify-end mt-4 space-x-2">
              <Button onClick={() => setIsCropping(false)} variant="secondary">Cancel</Button>
              <Button onClick={handleCropComplete}>Crop</Button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('text_content')}
          placeholder="What's on your mind?"
          className="w-full bg-[var(--bg-secondary)] border border-border-color rounded-md p-2 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.text_content && <p className="text-red-500 text-xs mt-1">{errors.text_content.message}</p>}

        <div {...getRootProps()} className={`mt-4 border-2 border-dashed border-border-color rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'border-accent' : ''}`}>
          <input {...getInputProps()} />
          <p className="text-text-secondary">Drag & drop up to 4 images here, or click to select files</p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {files.map((file, index) => (
              <div key={index} className="relative">
                <Image src={file.preview} alt={`preview ${index}`} width={100} height={100} className="rounded-lg object-cover w-full h-full" />
                <button type="button" onClick={() => removeFile(file)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 leading-none">&times;</button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
