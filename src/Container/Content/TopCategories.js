import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './Content.css'
export default function TopCategories() {
    return (
        <div className='topcategories'>
            <h2 style={{fontSize:20, fontWeight:500}}>Top categories</h2>
            <Row>
                <Col className='topcategories__card'>
                <img alt="design"  src="https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg" />
                <div className='topcategories__card__title'>
                <span>Design</span>
                </div>
                </Col>
                <Col className='topcategories__card'>
                <img alt="design"  src="https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg" />
                <div className='topcategories__card__title'>
                <span>Design</span>
                </div>
                </Col>
              
                <Col className='topcategories__card'>
                <img alt="design"  src="https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg" />
                <div className='topcategories__card__title'>
                <span>Design</span>
                </div>
                </Col>
                <Col className='topcategories__card'>
                <img alt="design"  src="https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg" />
                <div className='topcategories__card__title'>
                <span>Design</span>
                </div>
                </Col>
            </Row>
            <Row>
                <Col className='topcategories__card'>
                <img alt="design"  src="https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg" />
                <div className='topcategories__card__title'>
                <span>Design</span>
                </div>
                </Col>
                <Col className='topcategories__card'>
                <img alt="design"  src="https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg" />
                <div className='topcategories__card__title'>
                <span>Design</span>
                </div>
                </Col>
              
                <Col className='topcategories__card'>
                <img alt="design"  src="https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg" />
                <div className='topcategories__card__title'>
                <span>Design</span>
                </div>
                </Col>
                <Col className='topcategories__card'>
                <img alt="design"  src="https://s.udemycdn.com/home/top-categories/lohp-category-design.jpg" />
                <div className='topcategories__card__title'>
                <span>Design</span>
                </div>
                </Col>
            </Row>
        </div>
    )
}
