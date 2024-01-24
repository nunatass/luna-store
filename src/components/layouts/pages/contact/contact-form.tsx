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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// schema
const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Required' })
    .max(20, { message: `Name can't have more then 20 characters` })
    .trim(),
  email: z.string().email({ message: 'Email is required' }).trim(),
  message: z.string().min(1, { message: 'Required' }).trim(),
});

export const ContactForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // on submit
  const onSubmit = (data: { name: string; email: string; message: string }) => {
    console.log(data);
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
                  placeholder="exemple@email.com"
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

        <Button type="submit" className="w-full px-14 md:w-max">
          Send Message
        </Button>
      </form>
    </Form>
  );
};
