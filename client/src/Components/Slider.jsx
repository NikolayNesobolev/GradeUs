import React from "react"
import { Carousel, CarouselItem } from "react-bootstrap"
import bg from "../img/bg.jpg"

export default function NavBar() {
  return (
    <Carousel>
      <CarouselItem style={{ height: "700px" }}>
        <img className="d-block w-100" src={bg} alt="First slide..." />
        <Carousel.Caption>
          <h3>GradeUs</h3>
          <p>Convenient tool for sharing your project</p>
        </Carousel.Caption>
      </CarouselItem>
      <CarouselItem style={{ height: "700px" }}>
        <img className="d-block w-100" src={bg} alt="First slide..." />
        <Carousel.Caption>
          <h3>GradeUs</h3>
          <p>Convenient tool for sharing your project</p>
        </Carousel.Caption>
      </CarouselItem>
      <CarouselItem style={{ height: "700px" }}>
        <img className="d-block w-100" src={bg} alt="First slide..." />
        <Carousel.Caption>
          <h3>GradeUs</h3>
          <p>Convenient tool for sharing your project</p>
        </Carousel.Caption>
      </CarouselItem>
    </Carousel>
  )
}
