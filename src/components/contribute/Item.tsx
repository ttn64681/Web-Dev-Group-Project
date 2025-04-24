//Item component (from the User Individual Assignemnt)
// This is what decideds how each individual item will appear

interface ItemProps {
  item: {
    id: number;
    owner: string;
    title: string;
    desc: string;
    url: string;
  };
  isSelected: boolean;
  onSelectItem: () => void;
}

export default function Item({ item, isSelected, onSelectItem}: ItemProps) {
  return (
    <div className="py-4 flex flex-row gap-4 bg-[#33203A] rounded-lg">
      {/* Moved checkbox input from Items to here */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelectItem}
        className="mt-16 sm:mt-1 mr-2 self-start sm:self-center"
        style={{ transform: 'scale(1.5)' }}
      />
      <div className="flex flex-col sm:flex-row sm:items-start w-full gap-2 sm:gap-4">
        {/* Image */}
        <div className="py-2 pr-2 w-full sm:w-[35%]">
          <img
            src={`https://picsum.photos/seed/${item.id}/350/200`} 
            alt={item.title} 
            className="rounded-md object-contain w-full h-auto"
          ></img>
        </div>
        {/* Descriptions */}
        <div className="flex-1">
          <h2 className="text-white text-lg sm:text-xl font-bold">{item.title}</h2>
          <p className="text-grayish-purple text-base">{item.desc} </p>
          <p className="text-grayish-purple text-sm mt-2">Posted by: {item.owner}</p>
        </div>
      </div>
    </div>
  );
}
