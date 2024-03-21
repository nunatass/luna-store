type RaindropsIconProps = {
  className?: string;
};

export const RaindropsIcon = ({ className }: RaindropsIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="512"
      height="512"
      className={className}
    >
      <path d="M14,24a5.953,5.953,0,0,1-4.242-1.759,6.029,6.029,0,0,1,0-8.487L14,9.253l4.263,4.519a6.032,6.032,0,0,1-.021,8.466h0A5.953,5.953,0,0,1,14,24Zm0-11.829-2.808,2.977a4.017,4.017,0,0,0-.02,5.679,4.093,4.093,0,0,0,5.656,0h0a4.02,4.02,0,0,0,0-5.658Zm-9-.175a4.964,4.964,0,0,1-3.535-1.465,5.024,5.024,0,0,1,0-7.072L5,0,8.527,3.448a5.023,5.023,0,0,1,.008,7.08A4.961,4.961,0,0,1,5,11.993Zm0-9.2L2.871,4.878A3,3,0,0,0,7.12,9.113h0a3.014,3.014,0,0,0,0-4.243Zm15,7.2A3.974,3.974,0,0,1,17.172,8.82a4.019,4.019,0,0,1,0-5.657L19.982.039,22.86,3.2a4.021,4.021,0,0,1-.032,5.624h0A3.974,3.974,0,0,1,20,9.993Zm-.008-6.975-1.37,1.521a2,2,0,0,0,2.792,2.867h0a2.01,2.01,0,0,0,0-2.829Z" />
    </svg>
  );
};