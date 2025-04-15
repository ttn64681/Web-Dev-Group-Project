import Card from '../Card';

//Item component (from the User Individual Assignemnt)
// This is what decideds how each individual item will appear

interface ItemProps{
    item: {
        id: number;
        owner: string;
        title: string;
        desc: string;
        url: string;
    };
};

export default function Item({item}: ItemProps) {
    return (
        <Card className="p-4 flex flex-row">
          <div className="p-2 w-1/6">
                <img src={'https://www.techsmith.com/blog/wp-content/uploads/2023/08/What-are-High-Resolution-Images.png'} className="border-2 rounded-md border-form-pink-border object-contain"></img>
            </div>
            <div className="p-2 w-5/6">
                <h2>Title: {item.title}</h2>
                <p> Desc: {item.desc} </p>
                <a href=""> Url: {item.url} </a>
            </div>
        </Card>
    );
}