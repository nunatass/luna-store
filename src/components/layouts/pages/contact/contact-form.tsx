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
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// schema
const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Required' })
    .max(20, { message: `Name can't have more then 20 characters` })
    .trim(),
  email: z.string().trim().email({ message: 'Email is required' }),
  message: z.string().min(1, { message: 'Required' }).trim(),
});

export const ContactForm = () => {
  const {
    isPending,
    isError,
    mutate: sendMail,
  } = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      await axios.post('https://www.stellastone.store/api/contact-us', data);
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    sendMail(data);
    if (isError) {
      toast.error('Error sending contact email');
    } else {
      form.resetField('email');
      form.resetField('name');
      form.resetField('message');
      toast.success('Email sent successfully');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
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
                  placeholder="your-email@mail.com"
                  className="rounded-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write your message here..."
                  className="resize-none rounded-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex w-full items-center  gap-4 px-14 md:w-max"
        >
          Send Message
          {isPending && <Loader className="h-5 w-5 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
