import Card from './Card';

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
        <Card className="p-4">
            <div>
                <img src={'https://mma.prnewswire.com/media/1427646/quizlet_Logo.jpg?w=200'}></img>
            </div>
            <div>
                <h2>Title: {item.title}</h2>
                <p> Desc: {item.desc} </p>
                <p> Url: {item.url} </p>
            </div>
        </Card>
    );
}