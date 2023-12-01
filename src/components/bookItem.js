import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; // You can specialise part of Library you want instead of getting whole library
import axios from 'axios';

// BookItem Function
function BookItem(props) { // props (short for properties) are a mechanism for passing data from a parent component to a child component

    // defines what will be rendered when the component is used or included in another component
    return (

        <div>

            {/* Utilizes Card component from react-bootstrap representing a styled card */}
            <Card>

                <Card.Header>{props.myBook.title}</Card.Header> {/* accesses the title from the properties passed to the component */}

                <Card.Body>

                    {/* HTML element used to indicate that the enclosed text is a block of a quotation from another source
                    and to visually distinguish quoted or cited text from the surrounding content */}
                    <blockquote className="blockquote mb-0">

                        <img src={props.myBook.cover}></img> {/* accessing the cover image URL from the properties */}

                        <footer>

                            {
                            
                            props.myBook.author // accessing the author information from the properties
                            
                            }

                        </footer>

                    </blockquote>

                </Card.Body>

                {/* button link to the edit page for the current book */}
                <Link to={"/edit/"+props.myBook._id} className='btn btn-primary'>Edit</Link> {/* The to prop is constructed using props.myBook._id to form the URL */}
                <Button variant = "danger" onClick={
                    (e)=>{ // e stands for event

                        // Delete Added
                        axios.delete('http://localhost:4000/api/book/'+props.myBook._id)
                        // Refresh Page Added
                        .then((res)=>{
                            let reload = props.reload();
                        })
                        .catch();

                    }
                }>Delete</Button>

            </Card>

            {/* alternative way of displaying book information using HTML elements (h3, img, p) */}
            {/* <h3>{props.myBook.title}</h3>
            <img src={props.myBook.thumbnailUrl}></img>
            <p>{props.myBook.authors[0]}</p> */} 

        </div>

    );

}

// the default export is a way to export a primary item from a module, and it provides flexibility in naming when importing that item into other parts of your code
export default BookItem;