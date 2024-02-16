import { format } from 'date-fns';
import { Rating } from 'react-simple-star-rating';

import { Review } from '@/common/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type ReviewItemProps = {
  review: Review;
};
export const ReviewItem = ({ review }: ReviewItemProps) => {
  const { comment, createdAt, rating } = review || {};
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-14 w-14 bg-gray-700">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="tp-product-details-review-avater-content">
        <div className="tp-product-details-review-avater-rating d-flex align-items-center">
          <Rating
            allowFraction
            size={16}
            initialValue={rating}
            readonly={true}
          />
        </div>
        <div className="flex gap-2">
          <h3 className="text-base font-medium">Nuno Andrade</h3>
          <span className="text-sm text-gray-600">
            {format(new Date(createdAt), 'MMMM d, yyyy')}
          </span>
        </div>

        <p className="text-sm text-gray-600">{comment}</p>
      </div>
    </div>
  );
};
