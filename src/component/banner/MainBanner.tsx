import BannerImg from "../../img/main_banner9.png";
import { Banner, BannerText, GreenBar, TextBox } from "./style";
import { greenBar, textReveal, transition } from "./Variant";


function MainBanner(){

    return(
        <Banner bg={BannerImg}>
            <TextBox>
                <BannerText 
                    variants={textReveal}
                    initial="initial"
                    animate="animate"
                    transition={{ ...transition, delay: 0.5}}
                    >
                    내일을 향한 도전
                </BannerText>
                <BannerText 
                    variants={textReveal}
                    initial="initial"
                    animate="animate"
                    transition={{ ...transition, delay: 1.1 }}>
                    신구인의 꿈을 응원합니다
                </BannerText>
            </TextBox>
                        
            <GreenBar 
             variants={greenBar}
             initial="initial"
             animate="animate"
             transition={transition} />
        </Banner>
    )
}

export default MainBanner;