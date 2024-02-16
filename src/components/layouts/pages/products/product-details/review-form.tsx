'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import { z } from 'zod';

// schema
const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Required' })
    .max(20, { message: `Name can't have more then 20 characters` })
    .trim(),
  email: z.string().email({ message: 'Email is required' }).trim(),
  comment: z
    .string()
    .min(1, { message: 'Required' })
    .max(200, { message: `Can't have more than 200 characters` })
    .trim(),
});

type ReviewFormProp = {
  id: string;
};

export const ReviewForm = ({ id }: ReviewFormProp) => {
  // const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  // const [addReview, {}] = useAddReviewMutation();

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // on submit
  const onSubmit = (data: { name: string; email: string; comment: string }) => {
    console.log(data, id);

    //TODO:
    // if (!user) {
    //   notifyError('Please login first');
    //   return;
    // } else {
    //   addReview({
    //     userId: user?._id,
    //     productId: product_id,
    //     rating: rating,
    //     comment: data.comment,
    //   }).then((result) => {
    //     if (result?.error) {
    //       notifyError(result?.error?.data?.message);
    //     } else {
    //       notifySuccess(result?.data?.message);
    //     }
    //   });
    // }
    // reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="mt-4">
          <FormLabel>Your Rating :</FormLabel>
          <Rating
            onClick={handleRating}
            allowFraction
            size={24}
            initialValue={rating}
          />
        </div>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write your review here..."
                  className="max-h-72 rounded-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="name..."
                  className="rounded-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="exemple@email.com"
                  className="rounded-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="px-14">
          Submit
        </Button>
      </form>
    </Form>
  );
};
