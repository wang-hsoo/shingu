import styled from "styled-components";

const Wrraper = styled.div`
    width: 100%;
    height: 150px;
    background-color: #353541;
    margin-top: 60px;

    @media screen and (max-width: 850px) {
        height: 200px;
    }
    @media screen and (max-width: 600px) {
        height: 300px;
    }
    


    ul{
        width: 65%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #4a4a54;
        @media screen and (max-width: 1400px) {
            width: 80%;
        }
        @media screen and (max-width: 850px) {
            width: 90%;
        }
        @media screen and (max-width: 600px) {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }

        li:nth-child(1){
            color: #f9b656;
        }

        li{
            display: inline-block;
            padding: 16px 10px;
            font-size: 15px;
            color: #fff;
            letter-spacing: -0.5px;
            
            & > a{
                @media screen and (max-width: 1400px) {
                    font-size: 13px;
                }   
                @media screen and (max-width: 600px) {
                    font-size: 12px;
                }
            }
        }

    }
`
const Box = styled.div`
    width: 65%;
    margin: 0 auto;
    padding: 25px 0;
    font-style: normal;
    font-size: 15px;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1400px) {
        width: 80%;
    }
    @media screen and (max-width: 850px) {
        width: 90%;
    }

    address > div{

    }
`

function Footer(){

    return(
      <Wrraper>
        <ul>
			
            <li>
                <a href="https://www.shingu.ac.kr/cms/FR_CON/index.do?MENU_ID=300" target="_blank" title="">개인정보처리방침</a>
            </li>
        
            <li>
                <a href="https://www.academyinfo.go.kr/pubinfo/pubinfo1600/doInit.do?schlId=0000501" target="_blank" title="새창열림">대학정보공시</a>
            </li>
        
            <li>
                <a href="https://www.shingu.ac.kr/cms/FR_CON/index.do?MENU_ID=1960" target="_blank" title="">대학자체평가</a>
            </li>
        
            <li>
                <a href="https://www.shingu.ac.kr/cms/FR_CON/index.do?MENU_ID=1950" target="_blank" title="">이메일주소무단수집거부</a>
            </li>
        
            <li>
                <a href="https://www.shingu.ac.kr/cms/FR_CON/index.do?MENU_ID=1420" target="_blank" title="">입찰정보</a>
            </li>
        
            <li>
                <a href="https://www.shingu.ac.kr/cms/FR_CON/index.do?MENU_ID=1430" target="_blank" title="">채용정보</a>
            </li>
        
            <li>
                <a href="https://www.shingu.ac.kr/cms/FR_CON/index.do?MENU_ID=2030" target="_blank" title="">예결산공고</a>
            </li>
        
            <li>
                <a href="https://www.shingu.ac.kr/html/counsel/main.htm" target="_blank" title="새창열림">성희롱사이버신고센터</a>
            </li>
        
            <li>
                <a href="https://www.shingu.ac.kr/attach/202003/1584404113393_0.pdff" target="_blank" title="새창열림">영상정보처리기기운영관리방침</a>
            </li>
        
        </ul>

        <Box>
            <address>
                <div>
                    13174 성남시 중원구 광명로 377(금광2동 2685)
                    <span> | 학교안내 : 031-740-1114</span>
                </div>
               
                <em>ⓒ 2019 Shingu College ALL RIGHTS RESERVED.</em>
            </address>

        </Box>
        

      
      </Wrraper>
    )
}

export default Footer;