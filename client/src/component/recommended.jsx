import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Carousel from './carousel';
import PageButton from './pagebutton';

class Recommended extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalData: [],
      totalNum: 0,
      indexList: [], // current page
      current: 1,
      pageSize: 4, // product number in the page
      totalPage: 0,
    };
    this.getUpdateState = this.getUpdateState.bind(this);
    this.pageNext = this.pageNext.bind(this);
    this.setPage = this.setPage.bind(this);
    this.scollLeft = this.scollLeft.bind(this);
    this.scollRight = this.scollRight.bind(this);
  }

  componentDidMount() {
    axios.get('/2/recommendation/getInfo')
      .then((response) => {
        const productData = response.data;
        this.getUpdateState(productData);
        this.setPage(this.state.current);
      })
      .catch((error) => {
        console.log('get error', error);
      });
  }

  getUpdateState(data) {
    this.setState({
      totalData: data,
      totalNum: data.length,
      totalPage: Math.ceil(data.length/this.state.pageSize),
    });
  }

  setPage(num) {
    this.setState({
      indexList: this.state.totalData.slice(num, num + this.state.pageSize),
    });
  }

  pageNext(num) {
    this.setPage(num);
  }

  scollLeft() {
    document.getElementById('container').scrollLeft -= 600;
  }

  scollRight() {
    document.getElementById('container').scrollLeft += 600;
  }

  render() {
    return (
      <RecommendBody>
        <Wrapper>
          <div>
            <Title> Recommended For You </Title>
          </div>
          <div>
            <PageButton {...this.state} pageNext={this.pageNext} />
          </div>
          <ContainWrapper id="wrapper">
            <ArrowMove onClick={this.scollLeft}> &lt; </ArrowMove>
            <ScrollContain id="container">
              {this.state.indexList.map((prdts) => (
                <Carousel key={prdts.pid} prdts={prdts} />))}
            </ScrollContain>
            <ArrowMove onClick={this.scollRight}> &gt; </ArrowMove>
          </ContainWrapper>
        </Wrapper>
      </RecommendBody>
    );
  }
}

export default Recommended;

/* Style */
const RecommendBody = styled.div`
  margin: 0px auto;
`;

const Wrapper = styled.div`
  padding: 0px 0.75rem;
  margin: 0px auto;
  max-width: 100%;
  max-width: 82.5rem;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    scroll-behavior: smooth;
  }
`;
const Title = styled.h2`
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  font-family: 'Nunito Sans, sans-serif';
  font-size: 2rem;
  line-height: 2.6876rem;
  font-weight: 400;
  scroll-behavior: smooth;
`;
const ContainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center
`;

const ScrollContain = styled.div`
  display: flex;
  overflow: auto;
  postion: relative
`;

const ArrowMove = styled.button`
  height: 36px;
  width: 36px;
  background: transparent;
  border-radius: 50%;
  border:1px solid rgb(224,224,224);
  cursor: pointer;
  transition: transform ease-in 0.1s;
  outline:none;
  &:hover {
    transform: scale(1.1);
  }
  `;
