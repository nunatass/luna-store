import { format } from 'date-fns';
import { Rating } from 'react-simple-star-rating';

import { Review } from '@/common/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { generateRandomColor } from '@/lib/utils';

type ReviewItemProps = {
  review: Review;
};
export const ReviewItem = ({ review }: ReviewItemProps) => {
  const { comment, createdAt, rating, user } = review;
  const avatarBg = generateRandomColor([
    'bg-[#d4d4d8]',
    'bg-[#e7e5e4]',
    'bg-[#e0f2fe]',
    'bg-[#d1d5db]',
    'bg-[#cbd5e1]',
  ]);
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-10 w-10">
        <AvatarFallback className={avatarBg}>
          {user.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="">
        <Rating allowFraction size={16} initialValue={rating} readonly={true} />
        <div className="flex gap-2">
          <h3 className="text-base font-medium">{user.name}</h3>
          <span className="text-sm text-gray-600">
            {format(new Date(createdAt), 'MMMM d, yyyy')}
          </span>
        </div>

        <p className="text-sm text-gray-600 ">{comment}</p>
      </div>
    </div>
  );
};
