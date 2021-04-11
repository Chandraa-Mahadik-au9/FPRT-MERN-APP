import React from 'react';
import Star from '../assets/star.svg';
import HalfStar from '../assets/halfStar.svg';
import FullStar from '../assets/fullStar.svg';

const Rating = ({ rating, reviews }) => {

    const starBoxStyle = {
        display: "flex",
        flexDirection: "row",
        margin: "0.5rem"
    }
    const starStyle = {
        width: "1rem",
        margin: "1px"
    }

    const reviewStyle = {
        marginLeft: "0.3rem"
    }
    return (
        <div style={starBoxStyle}>
            <img style={starStyle} src={(rating >=1) ? FullStar : (rating >=0.5) ? HalfStar : Star} alt="rating" />
            <img style={starStyle} src={(rating >=2) ? FullStar : (rating >=1.5) ? HalfStar : Star} alt="rating" />
            <img style={starStyle} src={(rating >=3) ? FullStar : (rating >=2.5) ? HalfStar : Star} alt="rating" />
            <img style={starStyle} src={(rating >=4) ? FullStar : (rating >=3.5) ? HalfStar : Star} alt="rating" />
            <img style={starStyle} src={(rating >=5) ? FullStar : (rating >=4.5) ? HalfStar : Star} alt="rating" />
            {reviews && <span style={reviewStyle}>from {reviews} reviews</span>}
        </div>
    )
}

export default Rating;
