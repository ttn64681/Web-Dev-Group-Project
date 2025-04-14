import Item from "./Item"

// Items component maps the items out

type ItemType = {
    id: number;
    owner: string;
    title: string;
    desc: string;
    url: string;
};

interface ItemsProps {
    items: ItemType[];
}

const Items = ({items}: ItemsProps) => {
    return (
        <div>
            {items.map((item) => (
                <Item key = {item.id} item={item}/>
            ))}
        </div>
    );
}
export default Items;