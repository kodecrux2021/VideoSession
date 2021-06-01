import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'  
import './Home.css'
import elearn from '../../assets/images/elearn.jpg'
import instruc from '../../assets/images/instructor.jpg'
import freelan from '../../assets/images/codeexpert.jpg';
import Blog1 from '../../assets/blogs/Image 5.jpg';
import Blog1overlay from '../../assets/blogs/Group 493.jpg'

import studyImg from '../../assets/studyRoom.png';
import solutionImg from '../../assets/solutionRoom.png';

import home1 from '../../assets/images/home1.jpg'
import home2 from '../../assets/images/home2.jpg'
import home3 from '../../assets/images/home3.jpg'
import home4 from '../../assets/images/home4.jpg'
import home5 from '../../assets/images/home5.jpg'
import Navbar from '../../components/Header/Navbar';
import {message, Modal} from 'antd';
import kodecrux from '../../assets/images/reg2.jpeg';
import {AiFillMediumSquare,AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiFillLinkedin} from 'react-icons/ai';
import {FaQuora} from 'react-icons/fa'
import { Typography } from '@material-ui/core'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";


export default class Home extends Component {
    state = {
        visible: false,
        title: '',
        content: null,

    }

    // componentDidMount(){
    //     if(!localStorage.getItem('token')){
    //         message.info('Please login')
    //         this.props.history.push('/login')
    //     }
    // }
    links = () =>{
        this.setState({
            visible: true,
            title: 'Socials',
            content: <div>
                <a>https://www.linkedin.com/in/ekode-crux-a59694208/</a><br/>
                <a>https://www.facebook.com/ekode.crux/</a><br/>
                <a>https://www.instagram.com/ekodecrux/</a><br/>
                <a>https://twitter.com/ekodecrux</a><br/>
                <a>https://www.quora.com/profile/Ekode-Crux</a><br/>
                <a>https://medium.com/@ekodecrux</a><br/>
            </div>
            
        })
    }

    about = () =>{
        this.setState({visible: true,
        title: 'About Us',
        content: 'eKodecrux is a website for delivering IT services through its Developer market place.  We are making customers to find thier study and solution needs addressed by instant video/audio sessions or through structured E-learning marketplace'})
    }

    contact = () =>{
        this.setState({visible: true,
        title: 'Contact Us',
        content: <p>email - support@kodecrux.com<br/> Our Corporate Address -<br/> Expert aid technologies private limited Plot-44,<br/> Beeramguda,<br/> Hyderabad -502032<br/>Contact number - 95730 17223</p>})
    }

    service= () =>{
        this.setState({visible: true,
        title: 'Product and Services',
        content: <p>eKodecrux is a market place for both training and solution services. It is a platform to facilitate transaction of these services for our customers. Through the Website, eKodecrux facilitates the availing services and try to best fit to the customer needs based on defined pricing matrix. Ecodecrux or expert aid technologies is the only market place and all instructors and external learning platforms are only onboarded virtually to support this platform and market place.
        <br/>
        <b>Below is the service catalogue</b><br/>
        <b>Study room</b> : To cater needs to IT graduate, Freshers, job seekers, on job employes in terms of certification, training, expert sessions, market place for e-training<br/>
        <b>Solution room</b> : To cater needs to IT graduate, Freshers, job seekers, on job employes in terms of on job expert advice, project reviews, project/web site creation services .
        <br/><b>Pricing  :</b>
Cost of the services will be charged in currency INR. Study room and solution room charges as per the technology combination and usage duration ranges from 10 INR /Minute till 25 INR / Minute . The costs will be displayed to user via email and accordingly user can choose and proceed .</p>})
    }
    refund = () => {
        this.setState({visible: true,
        title: 'Refund and Return',
        content: <p>eKodecrux would like you to have a smooth experience of availing services at the click of a button. We do our best to keep you satisfied with the services as required by you. However, should you face any issue we would be ready to issue a refund service fee in the following cases – namely<br/>
        No solution found<br/>
        Instruter / code expert is not a professional<br/>
        Service quality is poor <br/>
        Our admin expert team will review such cases through recorded sessions and will take a final decision .</p>})
    }

    registration = () =>{
        this.setState({visible: true,
        title: 'Registration name of Business',
        content: <p>Expert aid technologies private limited <br/>
        Plot-44, Beeramguda, Hyderabad -502032</p>})
    }

    price = () =>{
        this.setState({visible: true,
        title: 'Price and Payment',
        content: <p>
            <ul>
           <li> The installation and use of this Website/App is free of cost. However, it is to be noted that although browsing of the Website / App is free, for purchase of any products, one has to be registered on our website – which is free of cost. However this policy of no charges may be amended by eKodecrux as deemed necessary.</li><br/>

<li>For the purpose of this section, Buyer would include any user choosing to use the products / services offered on eKodecrux Website / App. Seller means eKodecrux.</li><br/>

<li>In the case of use of any payment methods availed on eKodecrux Website/App, eKodecrux will not be responsible or assume any liability, whatsoever in respect of any loss or damage arising directly or indirectly to you due to issues including but not limited to - Lack of authorization for any transaction(s), exceeding preset spending limit / credit limit set up between you and your Financial Institution, any payment issues arising out of the failure of the transactions due to any technical issues, any decline of transactions due to any other reasons and so on.</li><br/>

<li>As of now, all payments will be in the default currency of Indian Rupees only. eKodecrux Website/App will not facilitate transactions using any other form of currency other than Indian Rupee.</li><br/>

<li>The price of products shown includes all applicable statutory taxes. We ensure that we take all necessary measures for the pricing and availability of Products to reflect the latest information on eKodecrux website / APP. But, in certain cases there might be some errors due to price changes or product availability. In such cases we are not responsible for those errors and we reserve the right to cancel the sale and refund the amount to you. We also reserve the right to correct any errors due to data typography, inaccuracies, omissions and can change or update any information of the product at any time without any prior notice.</li><br/>
</ul></p>})
    }

    policy = () =>{
        this.setState({visible: true,
        title: 'Privacy Policy',
        content: <p><b>Purpose</b><br/>
        Little & Big is committed to protecting your privacy because we are committed to valuing people. Our Privacy Policy below sets out how your personal information is collected, used and protected. The Demo Country Privacy Principles also apply to us.<br/>
        
        This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.<br/>
        
        <b>What is Personal Data?</b><br/>
        When used in this Policy, "personal information" has the meaning given in the Privacy Act. Generally, it means any information or an opinion that could be used to identify you.<br/>
        
        <b>Personal Data Collected</b><br/>
        Personal Data collected for the following purposes and using the following services:<br/>
        
        Google Analytics: Cookies; Usage Data<br/>
        Contact form: email address; first name; phone number<br/>
        Mailing list or newsletter:email address; first name<br/>
        Accessing your Personal Data<br/>
        You may request access to your personal information collected by us, and ask that we correct that personal information. You can ask for access or correction by contacting us and we will usually respond within 30 days. If we refuse to give you access to, or correct, your personal information, we will notify you in writing setting out the reasons.<br/>
        
        <b>Complaints</b><br/>
        If you believe your privacy has been breached or you have a complaint about how we have handled your personal information, please contact us in writing. We will respond within a reasonable period (usually within 30 days).<br/>
        
        Owner and Data Controller<br/>
        support@kodecrux.com<br/>
        Our Corporate Address<br/>
        Expert aid technologies private limited <br/>
        Plot-44, Beeramguda, Hyderabad -502032<br/>
        </p>})
    }

    terms = () =>{
        this.setState({visible: true,
        title: 'Terms and Services',
        content: <p>The following are the Terms and Conditions, read together with the Privacy Policy, that govern your purchase and use of the services  from eKodecrux.com, and constitute a legally binding agreement, between you ("the Customer", the "User") and eKodecrux ( Parent company - Expert aid technologies private limited)<br/>

        These Terms of Use constitute an electronic record in terms of the IT Act and rules framed there under, as applicable and amended from time to time. This electronic record is generated by a computer system and does not require any physical or digital signatures.<br/>
        
        By accessing, browsing or in any way transacting on the Website, or availing any Services, You signify Your agreement to be bound by these Terms of Use. Further, by explicitly / impliedly or expressly accepting these Terms of Use, you also accept and agree to be bound by Our policies, terms and conditions, including the Privacy Policy (referred to as “Privacy Policy”), and such other rules, guidelines, policies, terms and conditions as are relevant under the applicable law(s) in India and other jurisdictions for the purposes of accessing, browsing or transacting on the Website, or availing any of the Services, and such rules, guidelines, policies, terms and conditions shall be deemed to be incorporated into, and considered as part and parcel of these Terms of Use. However, if You navigate away from the Website to a third party website, You may be subject to alternative terms and conditions of use and privacy policy, as may be specified on such website. In such event, the terms and conditions of use and privacy policy applicable to that website will govern Your use of that website.<br/>
        
        Compliance with these Terms of Use would entitle You to a personal, non-exclusive, non-transferable, limited privilege to access and transact on our Website.<br/>
        
        <b>About eKodecrux</b><br/><p>
        a) The domain name www.eKodecrux.com, an internet based portal and eKodecrux a mobile application, is owned and operated by eKodecrux Technologies LLP, a company duly incorporated under the provisions of the Companies Act, 2013 whose registered office is in Ahmedabad, India (hereinafter referred to as “eKodecrux” or “We” or “Our” or “Us” or “Company”). The domain name and the mobile application are collectively referred to as the “Website”.<br/>
        
        b) Your access or use of the Website, transaction on the Website and use of Services (as defined herein below) hosted or managed remotely through the Website, are governed by the following terms and conditions (hereinafter referred to as the Terms of Use”), including the applicable policies which are incorporated herein by way of reference. These Terms of Use constitutes a legal and binding contract between you (hereinafter referred to as “You” or “Your” or the “User”) on one part and eKodecrux on the other Part.
        <br/>
        c) The arrangement between the any Third Party Service Providers, You and Us shall be governed in accordance with these Terms of Use. The Services would be made available to such natural persons who have agreed to use the Website after obtaining due registration, in accordance with the procedure as determined by Us, from time to time, (referred to as “You” or “Your” or “Yourself” or “User”, which terms shall also include natural persons who are accessing the Website merely as visitors). The Services are offered to You through various modes which may include issue of discount coupons, offer codes and vouchers that can be redeemed for various goods/ services offered for sale by relevant Third Party Service Providers. To facilitate the relation between You and the Third Party Service Providers through the Website, eKodecrux shall send to You (promotional content including but not limited to emails, notifications, text messages or whatsapp messages).
        <br/>
        d) You agree and acknowledge that the Website is a platform that You and Third Party Service Providers utilize to meet and interact with another for their transactions. eKodecrux is not and cannot be a party to or save as except as may be provided in these Terms of Use, control in any manner, any transaction between You and the Third Party Service Providers.
        <br/>
        e) eKodecrux reserves the right to change or modify these Terms of Use or any policy or guideline of the Website including the Privacy Policy, at any time and in its sole discretion. Any changes or modifications will be effective immediately upon posting the revisions on the Website and You waive any right You may have to receive specific notice of such changes or modifications. Your continued use of the Website will confirm Your acceptance of such changes or modifications; therefore, You should frequently review these Terms of Use and applicable policies to understand the terms and conditions that apply to Your use of the Website.
        <br/>
        f) As a condition to Your use of the Website, You must be 18 (eighteen) years of age or older to use or visit the Website in any manner. By visiting the Website or accepting these Terms of Use, You represent and warrant to eKodecrux that You are 18 (eighteen) years of age or older, and that You have the right, authority and capacity to use the Website and agree to and abide by these Terms of Use.
        <br/>
        g) These Terms of Use is published in compliance of, and is governed by the provisions of Indian laws, including but limited to:
        <br/></p>
        <p>
        i) the Indian Contract Act, 1872 (“Contract Act”);<br/>
        ii) the (Indian) Information Technology Act, 2000 (“IT Act”) and the rules, regulations, guidelines and clarifications framed thereunder, including the (Indian) Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011, and the (Indian) Information Technology (Intermediaries Guidelines) Rules, 2011 (“IG Guidelines”);<br/>
        iii) the Drugs and Cosmetic Act, 1940 (“Drugs Act”), read with the Drugs and Cosmetics Rules, 1945 (“Drugs Rules”);<br/>
        iv) the Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 (“Drugs and Magic Act”);<br/>
        v) The Indian Medical Council Act, 1956 read with the Indian Medical Council Rules, 1957;<br/>
        vi) Pharmacy Act, 1948 (“Pharmacy Act”) and<br/>
        vii) the Consumer Protection Act, 1986.<br/></p>
        
        i) eKodecrux authorizes You to view and access the content available on the Website solely for the purposes of availing the Services, such as visiting, using, ordering, receiving, delivering and communicating only as per these Terms of Use. The contents on the Website including information, text, graphics, images, logos, button icons, software code, design, and the collection, arrangement and assembly of content, contains Third Party Service Providers’ content (“Third Party Content”) as well as in-house content provided by eKodecrux including but not limited to text, copy, audio, video, photographs, illustrations, graphics and other visuals (“1mg Content”) (collectively, “Content”). The eKodecrux Content is the property of eKodecrux and is protected under copyright, trademark and other applicable law(s). You shall not modify the eKodecrux Content or reproduce, display, publicly perform, distribute, or otherwise use the eKodecrux Content in any way for any public or commercial purpose or for personal gain.
        
       <b> Account Creation</b>
        
        <p>
        (1) In order to use certain features of the Website/App (e.g., ordering Products, posting rating / reviews, providing feedback, receiving eKodecrux “medsmails”), you must set up an account with eKodecrux.com ("eKodecrux User Account") and provide certain information about yourself as prompted by the Customer Information form, including, your name, gender, email address, account password, mobile phone number and billing/shipping address. All of your registration information is protected by our Privacy Policy.<br/>
        
        (2) You represent and warrant that the information you submit during registration is truthful and accurate and that you will maintain the accuracy of such information.<br/>
        
        (3) Your eKodecrux User Account username and password are personal to you. You may not transfer your account and you will be responsible for the activities associated with your eKodecrux Account.
        <br/>
        (4) eKodecrux.com will not be liable for any loss or damages as a result of your failure to maintain the confidentiality of your account credentials. If you suspect any unauthorised use of your eKodecrux User Account, you shall immediately notify eKodecrux.com.
        <br/>
        (5) It is your responsibility to keep your email address up-to-date on your account setup at eKodecrux.com / “App” so that we can communicate with you electronically.
        <br/>
        (6) By creating this account you agree to receive transactional and/or promotional communications from us via email, telephone, SMS, whatsapp and chat. If you, at any time, wish to discontinue receiving communications from us, you agree to notify us by email.
        <br/>
        (7) The registration on or use/ access of the Website is only available to natural persons, other than those who are ‘incompetent to contract’ under the Contract Act. That is, persons including minors, un-discharged insolvents etc. are not eligible to register on, or use/ access the Website. By registering, accessing or using the Website, You accept the terms of these Terms of Use and represent and warrant to eKodecrux that you are ‘competent to contract’ under the Contract Act and have the right, authority and capacity to use the Website and agree to and abide by these Terms of Use.
        <br/>
        (8) One person can create only one account and you agree to this.
        <br/>
        (9) The website or app will be using cookies to store deidentified non-personal technical data that is used for the technical administration of the website/app, User Administration, R&D also. In the course of serving advertisements or optimizing services to You, eKodecrux may allow authorized third parties to place or recognize a unique cookie on the Your browser. eKodecrux does not store personally identifiable information in the cookies.
        <br/>
        (10) eKodecrux at its sole discretion, reserves the right to permanently or temporarily suspend Users, to bar their use and access of the Website and App, at any time while eKodecrux investigates complaints or alleged violations of these Terms of Use or any Services, or for any other reason
        <br/></p>
        Use of Services and the Website<br/>
        eKodecrux is an IT services market place  Platform for training and on job solutions. It is a platform to facilitate purchase transaction of these services for our customers. Through the Website, eKodecrux facilitates the services , it is not liable to take ownership of individual aspects of virtual code experts, trainers, instructors who are only onboarded based on subscription of customers needs , not on paroll of Ecodecrux or expert aid technologies pvt limited<br/>
        
        You understand and agree that eKodecrux and the Website provide services to You and persons browsing / visiting the Website. All services offered for sale on the Website, and the content made available by third party experts and training vendors  . eKodecrux has no control over the content delivered by these experts . You understand and agree that eKodecrux shall have no liability with respect to the authenticity of the services  being facilitated through the Website.<br/>
        
        <b>Security Policy</b><br/>
        eKodecrux uses 256-bit Secure Sockets Layer (SSL) encryption technology to encrypt your data before sending it over the internet. This ensures the privacy and high level of security of all your information.
        <br/>
        <b>Eligibility / User Account and Usage Rules</b><br/>
        Only those who are 18 years or older and are supposed to have attained the age of “Majority” can create an account and be a member of eKodecrux. Membership cannot be availed of by those who are considered Incompetent to enter into a Contract under the Indian Contract Act, 1872 subject to the conditions listed above.
        <br/>
        Further, User is solely responsible for protecting the confidentiality of the Account details such as your username and password and any activity under the account will be deemed to have been done by you. In the case that you provide us with false and inaccurate details or the Company has reasonable reasons to believe you have done so, we hold the rights to suspend your account and/or terminate this Agreement without any notice and without being held liable for the same.
        <br/>
        You understand the App downloaded/or the website you use on to your phone or tablet is owned by us and we may automatically upgrade the App/website and these Terms shall apply to the upgrades as well. We reserve the right to terminate this agreement without any notice and suspend the account without assigning any reason.
        <br/>
        <b>Indemnity Clause</b><br/>
        You as a User agree to indemnify, defend, hold harmless Netmeds.com and its officers, directors, employees, agents, information providers, partners, licensors, advertisers and suppliers from and against all damages, claims, expenses, costs and / or losses, including reasonable legal fees and costs, resulting from any violation of this agreement, or any activity related to your account, or any information or material you have submitted or will submit to us in violation of any law or in breach of any third party rights (including, but not limited to, claims in respect of defamation, invasion of privacy, or infringement of any other intellectual property rights). We reserve the right to exclusively defend and control any claims arising from the above and any such indemnification matters, and you hereby agree to cooperate fully with us in asserting any available defenses.
        <br/>
        <b>Jurisdictional Authority and Applicable Laws</b><br/>
        These Terms and Conditions and your use of eKodecrux Website/App and its content will be governed by and construed in all respects in accordance with the laws of India subject to the jurisdictional courts of Ahmedabad.
        <br/>
        <b>Changes to Terms and Conditions</b><br/>
        eKodecrux, reserves the right to amend the terms and conditions issued on the Website / App from time to time without further notice to you. We will make such changes effective once we upload the relevant revised version of the terms and conditions available on the Website / App. You are responsible to review any changes of our Terms and conditions and your continued use of our Website / App is deemed to be your agreement that you automatically agree to the updates made to the terms and conditions.
        <br/>
        <b>Registered Name of Business</b><br/>
        Expert aid technologies private limited <br/>
        Plot-44, Beeramguda, Hyderabad -502032<br/>
        <b>Cancellation policy :</b>

You as a customer can cancel services anytime up to the cut-off time of the slot ( 4 hours after availing service )   by calling our customer service or writing to sales@kodecrux.com . In such a case we will review and refund any payments already made by you .<br/>
<b>Refund policy :</b>

If as a user, you wish to refund the payment if they do not meet thier required target , they can give rating accordingly and ask for refund of thier amount. Admin team will review and process refund accordingly . Once cancelled or refund requested , refund will be processed in the original mode of payment, which will be credited within 7 to 10 working days</p>})
    }

    handleCancel = () =>{
       this.setState({visible: false})
      } 

      studyRoomClick = () =>{
        if(localStorage.getItem('token')){
            this.props.history.push("/courses");
        }  
        else{
            message.info('Please login to go ahead!')
            this.props.history.push("/login");
            //  {<Redirect to="/login" />}
        }
       
      }

      solutionRoomClick = () =>{
        if(localStorage.getItem('token')){
            this.props.history.push('/help/1');
        }  
        else{
            alert('Please login to go ahead!');
            this.props.history.push("/login");
        }
      }
    render() {
        return (
        <>
        <Navbar />
        <div className='body__ctr'>
            <div className="home_container">
                <Carousel controls={false} interval={10000} indicators={true} pause={false} fade={true} style={{marginTop: -20}} >
                    <Carousel.Item >
                        <img
                        className="d-block w-100"
                        src={home1}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                        className="d-block w-100"
                        src={home2}
                        alt="Second slide"
                        />
                    
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={home3}
                        alt="Third slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={home4}
                        alt="Third slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={home5}
                        alt="Third slide"
                        />

                    </Carousel.Item>
                </Carousel>
            {/* immortal ui mod */}
            <div className="button__container">
                <div className="button__card">
                    <div className="button__card__img">
                        <img src={studyImg} alt="" />
                    </div>
                    <div className= 'button__card__details' style ={{bottom: '0'}}>
                        <h2 style={{flex:0.2}}>Study Room</h2>
                        <Typography style={{flex:0.6, fontSize:15, lineHeight:1.5, fontFamily:'Segoe UI'}}>Online tutoring platform with best experts are being onboarded to help your academic needs.</Typography>
                        <div style={{flex:.2, display:'flex', alignItems:'center', paddingTop:10}}>
                            <button onClick={this.studyRoomClick} >Study Room</button>
                        </div>
                    </div>
                </div>

                <div className="button__card">
                    <div className="button__card__img">
                        <img src={solutionImg} alt="" />
                    </div>
                    <div className= 'button__card__details'>
                        <h2 style={{flex:0.2}}>Solution Room</h2>
                        <Typography style={{flex:0.6, fontSize:15, lineHeight:1.5, fontFamily:'Segoe UI'}}>Our solution can address on your on-the job challenges at various phases of projects including Design, Reviews, debugging , troubleshooting , hot fixes and quick project needs.</Typography>
                        <div style={{flex:0.2, display:'flex', alignItems:'center', paddingTop:10}}>
                            <button onClick={this.solutionRoomClick} >Solution Room</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cards__container">
                <div className="_card">
                    <img src={elearn} alt=""/>
                    <h3>
                    E-Learning market place
                    </h3>
                    <p>
                    Just a click-away to experience one-stop  solution for all your training ,learning and certification needs .  Our objective is to give best-in-class platform to access Industry's most prominent learning providers .  We offer solution for training needs of both Academic ,On-job experts  with seemless integration features .
                    </p>
                </div>
                <div className="_card">
                    <img src={freelan} alt=""/>
                    <h3>
                        Code Expert
                    </h3>
                    <p>
                    We offer a expert support with one click away . Our solution can address on your on-the job challenges at various phases of projects including Design, Reviews, debugging , troubleshooting , hot fixes and quick project needs. We have variety of experts who can be your buddy to support your project completion with all necessary tools, expertise . Our free lancer module can be your virtual team to meet your deliverables. 
                    </p>
                </div>
                <div className="_card">
                    <img src={instruc} alt=""/>
                    <h3>
                    Instructor
                    </h3>
                    <p>
                    Online tutoring platform with best experts are being onboarded to help your academic needs.  Our specialization includes Computer science, software Programming ,  Information technology with salient features of Video and Audio based interactive sessions.
                    </p>
                </div>
            </div>

            <div className="blog__container">
                <div  style ={{display: 'inline'}}>
                    <div className= 'button__card__details' style={{minHeight:250}}>
                        <Typography variant="h2" style={{fontSize:35}}>Blogs by Ekodecrux</Typography>
                        <Carousel controls={false} interval={10000} indicators={true} pause={false} fade={true} style={{marginTop:20}} >
                            <Carousel.Item >
                                <div style={isMobile ? {display:'flex', flexDirection:'column'} : {display:'flex'}} className="blog_mobile_prev">
                                    {/* <img style={{position:'absolute', left:-200, zIndex:100}} src={Blog1overlay} alt="overlay" /> */}
                                    <img
                                        // className="d-block w-100"
                                        className="blog_mobile_prev_img"
                                        style={isMobile ? {width:"100%"} : {width:"30%"}}
                                        src={Blog1}
                                        alt="First slide"
                                    />
                                    <div className="blog_mobile_prev_blog" style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center',
                                    padding:isMobile ? 20 : 40, margin: isMobile ? "20px 0" : 20, border:2, borderStyle:'solid', borderColor:'#3743B1', borderRadius:20}}>
                                        <Typography style={{fontSize:15, fontWeight:"normal"}}>Gig economy statistics show a free market system where organizations and independent workers engage in short-term work arrangements. BLS data suggest that in 2017 the US gig economy had 55 million participants. It's estimated that 36% of US workers take part in the gig economy and 33% of companies extensively use gig workers.
                                        <a style={{color:'#3743B1'}}> Read more</a>
                                        </Typography>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item >
                                <div style={{display:'flex'}} className="blog_mobile_prev">
                                    {/* <img style={{position:'absolute', left:-200, zIndex:100}} src={Blog1overlay} alt="overlay" /> */}
                                    <img
                                        // className="d-block w-100"
                                        className="blog_mobile_prev_img"
                                        style={{width:"30%"}}
                                        src={Blog1}
                                        alt="First slide"
                                    />
                                    <div className="blog_mobile_prev_blog" style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center',
                                    padding:40, margin:20, border:2, borderStyle:'solid', borderColor:'#3743B1', borderRadius:20}}>
                                    <Typography>Gig economy statistics show a free market system where organizations and independent workers engage in short-term work arrangements. BLS data suggest that in 2017 the US gig economy had 55 million participants. It's estimated that 36% of US workers take part in the gig economy and 33% of companies extensively use gig workers.
                                    </Typography>
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                        
        
                    </div>
                </div>
            </div>

            
            
        
        <div className="_footer">
            <div className="footer__cards">
                <h3>ABOUT</h3>
                <span onClick = {this.about}><a>About Us</a></span>
                <span onClick = {this.contact}><a>Contact Us</a></span>
                <span onClick = {this.service}><a>Product and Services</a></span>
            </div>
            <div className="footer__cards">
                <h3 >POLICY</h3>
                <span onClick = {this.refund}><a>Refund and return</a></span>
                {/* <span onClick = {this.shipping}><a>Shipping and Delivery Policy</a></span> */}
                <span onClick = {this.price}><a>Price and Payment</a></span>
                <span className = "socials"> <a href = 'https://www.facebook.com/ekode.crux/'><AiFillFacebook/></a>
                <a href = 'https://www.instagram.com/ekodecrux/'><AiFillInstagram/> </a>
                <a href = 'https://twitter.com/ekodecrux/'><AiFillTwitterSquare/></a> 
                <a href = 'https://www.linkedin.com/in/ekode-crux-a59694208/'><AiFillLinkedin/></a> 
                <a href = 'https://www.quora.com/profile/Ekode-Crux'><FaQuora/></a> 
                <a href = 'https://medium.com/@ekodecrux'><AiFillMediumSquare/></a></span>
            </div>
            <div className="footer__cards">
                <h3>HELP</h3>
                <span onClick = {this.policy}><a>Privacy Policy</a></span>
                <span onClick = {this.terms}><a>Terms and Services</a></span>
                <span onClick = {this.registration}><a>Registration name of Business</a></span>
                
            </div>
        </div>
    </div>
        </div>
        <Modal
          visible={this.state.visible}
          title={this.state.title}
          footer={null}
          onCancel={this.handleCancel}
        >
          <p>{this.state.content}</p>
        </Modal>
        </>
     
     
        )
    }
}
