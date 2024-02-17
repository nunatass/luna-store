'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReview } from '@/hooks/api/use-reviews';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'sonner';
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
  rating: z
    .number()
    .min(0.5, { message: 'Give a minimum rating of 0.5 start' }),
});

type ReviewFormProp = {
  productId: string;
};

export const ReviewForm = ({ productId }: ReviewFormProp) => {
  const { mutate: createReview, isSuccess } = useCreateReview();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { comment: '', email: '', name: '', rating: 0 },
  });

  useEffect(() => {
    form.reset({ comment: '', name: '', email: '', rating: 0 });
    toast.success('Your review has sent with success, Thank You!', {
      duration: 2,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleRating = (rate: number) => {
    form.setValue('rating', rate);
  };

  const onSubmit = (data: {
    name: string;
    email: string;
    comment: string;
    rating: number;
  }) => {
    createReview({
      comment: data.comment,
      email: data.email,
      name: data.name,
      rating: data.rating,
      productId,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="rating"
          render={() => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Your Rating :</FormLabel>
              <FormControl>
                <div className="mt-4">
                  <Rating
                    onClick={handleRating}
                    allowFraction
                    size={24}
                    initialValue={form.getValues().rating}
                  />
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.rating &&
                  `${form.formState.errors.rating}`}
              </FormMessage>
            </FormItem>
          )}
        />

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
              <FormMessage>
                {form.formState.errors.comment &&
                  `${form.formState.errors.comment}`}
              </FormMessage>
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
              <FormMessage>
                {form.formState.errors.name && `${form.formState.errors.name}`}
              </FormMessage>
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
              <FormMessage>
                {form.formState.errors.email &&
                  `${form.formState?.errors?.email}`}
              </FormMessage>
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
