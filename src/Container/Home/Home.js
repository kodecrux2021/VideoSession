import React, { Component } from 'react'
import {Carousel, Row} from 'react-bootstrap'  
import SolutionRoom from "../../assets/img/icon-2.png"
import signup from   "../../assets/img/icon-1.png"
import studyroom from  "../../assets/img/icon-3.png"
import dm from "../../assets/img/path-img1.jpg"
import ui from "../../assets/img/path-img2.jpg"
import it from "../../assets/img/path-img3.jpg"
import fd from "../../assets/img/path-img4.jpg"

import wd  from "../../assets/img/path-img5.jpg"
import ad  from "../../assets/img/path-img6.jpg"
import pm  from "../../assets/img/path-img7.jpg"
import pd  from "../../assets/img/path-img8.jpg"
import LOGO from "../../assets/img/logo.png"

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
import {AiFillMediumSquare,AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiFillLinkedin, AiOutlineTwitter} from 'react-icons/ai';
import {FaQuora, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMediumM} from 'react-icons/fa'
import { Typography } from '@material-ui/core'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";
  import './Home.css'


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

<li>All prices and payments are in INR.</li><br />

<li>Chekout functionality is enabled through PAYNOW module in application.</li> <br />
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
        On your visit or signing up at the site, you consciously accept the terms and conditions of use and accept the guidelines and conditions applicable to the services and business. This declaration is liable to be treated as a document of “Electronic Record” in terms of the Information Technology Act, 2000 and Rules. This electronic record is generated by a computer system and does not require any physical or digital signatures.
        <br/>
        This document is being published in accordance with the provisions of Rule 3 <br/> (1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 in compliance with the rules and regulations, privacy policy and the terms and conditions for access or usage of our website. Please read the following terms and conditions very carefully before using the Website.</p>
        
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

    handleSignup = () => {
        this.props.history.push('/registration')
      }
    render() {
        return (
        <>
        <Navbar />
        {/* Home Banner */}
			<section class="section section-search">
				<div class="container" style={{width:"100%"}}>
					<div class="banner-wrapper m-auto text-center">
						<div class="banner-header">
							
							<h1>Find a developer for <span>live mentorship</span> & get access to superior <span>learning platforms</span></h1>
							<p>eKodeCrux for Teams brings expert programming help right to your screen.</p>
						</div>
                         
						<div class="view-all text-center"><a style={{color:"white"}} class="btn btn-primary">Get Access Now !!!</a></div>
					
						
					</div>
				</div>
			</section>
            
			{/* Home Banner END */}


            <section class="section how-it-works">
				<div class="container" style={{width:"100%"}}>
					<div class="section-header text-center">
						<span>eKodeCrux Flow</span>
						<h2>How does it works ?</h2>
						<p class="sub-title">Are you looking to get online Codeing Help? Now it's very simple, Sign up with eKodeCrux</p>
					</div>
                    
                    <Row>
                   
						<div class="col-12 col-md-6 col-lg-4">
							<div class="feature-box text-center" style={{backgroundColor:'aquamarine'}}>					
								<div class="feature-header">
									<div class="feature-icon">
										<span class="circle"></span>
										<i><img src={signup} alt="" /></i>
									</div>		
									<div class="feature-cont">	
										<div class="feature-text">Sign up</div>
									</div>
								</div>
								<p class="mb-0">Are you looking to join eKodeCrux? Now it's very simple to connect with a mentor who can help you on your regular work environment.</p>
								<br></br>
								<div class="view-all text-center"><a style={{color:"white"}} onClick={this.handleSignup} class="btn btn-primary" >Sign Up</a></div>
							</div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4">
							<div class="feature-box text-center">					
								<div class="feature-header">
									<div class="feature-icon">
										<span class="circle"></span>
										<i><img src={SolutionRoom} /></i>
									</div>	
									<div class="feature-cont">
										<div class="feature-text">Solution Room</div>
									</div>
								</div>
								<p class="mb-0">Our solution room address your IT academic needs and on-the job IT challenges through experienced Tutors and Industry Code experts.</p>
								<br></br>
								<div class="view-all text-center"><a style={{color:"white"}} onClick={this.solutionRoomClick} class="btn btn-primary">Get Online Solution Now</a></div>
							</div>
						</div>
						<div class="col-12 col-md-6 col-lg-4">
							<div class="feature-box text-center">					
								<div class="feature-header">
									<div class="feature-icon">
										<span class="circle"></span>
										<i><img src={studyroom} alt="" /></i>
									</div>	
									<div class="feature-cont">
										<div class="feature-text">Study Room</div>
									</div>
								</div>
								<p class="mb-0">Study room is One stop training marketing place partnered with world class Elearning vendors to fulfill your academic, reskilling goals.</p>
								<br></br>
								<div class="view-all text-center"><a style={{color:"white"}} onClick={this.studyRoomClick} class="btn btn-primary">Get access to studyroom</a></div>
							</div>
						</div>
							
						
                     </Row>
                </div>
             </section>
             <section class="section popular-courses">
				<div class="container" style={{width:"100%"}}>
					<div class="section-header text-center">
						<span>eKodeCrux Goals</span>
						<h2>Popular Mentors</h2>
						<p class="sub-title">Do you want to move on next step? Choose your most popular leaning mentors, it will help you to achieve your professional goals.</p>
					</div>
                </div>
                {/* <div class="owl-carousel owl-theme">
				
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user1.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Sudheer Vamaraju</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    Digital Marketer
                                </div>
                            </div>
                            <div class="rating">							
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Hyderabad, India.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user2.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Rahul Joshi</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    Business Development Expert
                                </div>
                            </div>
                            <div class="rating">						
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Mumbai, India.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user3.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title">Krishna Teja</h3>
                            <div class="author-info">
                                <div class="author-name">
                                    ASP.NET,Computer Gaming
                                </div>
                            </div>
                            <div class="rating">						
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Bangalore, India.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user4.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Hemanth kumar</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    Computer Programming
                                </div>
                            </div>
                            <div class="rating">						
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Pune, India.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Kiran Kumar</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    Digital Marketer
                                </div>
                            </div>
                            <div class="rating">							
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star "></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Mangalore, India.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user6.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Aditya Nukala</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    UNIX,Calculus,Trigonometry
                                </div>
                            </div>
                            <div class="rating">						
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Chennai, India.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user7.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Mohan Brahmi</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    ASP.NET,Computer Gaming
                                </div>
                            </div>
                            <div class="rating">						
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Kochi, Hyderabad.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user15.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Misty Lundy</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    Computer Programming
                                </div>
                            </div>
                            <div class="rating">
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Paris, France</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user9.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Vern Campbell</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    Digital Marketer
                                </div>
                            </div>
                            <div class="rating">
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Paris, France</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user13.jpg" width="600" height="300" />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Jessica Fogarty</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    UNIX,Calculus,Trigonometry
                                </div>
                            </div>
                            <div class="rating">
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star filled"></i>
                                <i class="fas fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Paris, France</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user11.jpg" width="600" height="300"/>
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Evelyn Stafford</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    ASP.NET,Computer Gaming
                                </div>
                            </div>
                            <div class="rating">
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star "></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Paris, France</p>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="course-box">
                    <div class="product">
                        <div class="product-img">
                            <a href="profile.html">
                                <img class="img-fluid" alt="" src="assets/img/user/user12.jpg" width="600" height="300"/>
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 class="title"><a href="profile.html">Christopher Carroll</a></h3>
                            <div class="author-info">
                                <div class="author-name">
                                    Computer Programming
                                </div>
                            </div>
                            <div class="rating">
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star filled"></i>
                                <i class="fa fa-star"></i>
                                <span class="d-inline-block average-rating">4.4</span>
                            </div>
                            <div class="author-country">
                                <p class="mb-0"><i class="fas fa-map-marker-alt"></i> Paris, France</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            {/* </div> */}
            </section>

             {/* Path section start  */}
			<section class="section path-section">
				<div class="section-header text-center">
					<div class="container" style={{width:'100%'}}>
						<span>Choose the</span>
						<h2>Different All Learning Paths</h2>
						<p class="sub-title">Contact professionals to sort out your realtime coding issues.</p>
					</div>
				</div>
                <div class="learning-path-col">
					<div class="container"  style={{width:'100%'}}>
                        <Row>
                        <div class="col-12 col-md-4 col-lg-3">
								<div class="large-col">
									<a href="search.html" class="large-col-image">
										<div class="image-col-merge">
											<img src={dm} alt="" />
											<div class="text-col">
												<h5>Digital Marketer</h5>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="col-12 col-md-4 col-lg-3">
								<div class="large-col">
									<a href="search.html" class="large-col-image">
										<div class="image-col-merge">
											<img src={ui} alt="" />
											<div class="text-col">
												<h5>Ui designer</h5>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="col-12 col-md-4 col-lg-3">
								<div class="large-col">
									<a href="search.html" class="large-col-image">
										<div class="image-col-merge">
											<img src={it} alt="" />
											<div class="text-col">
												<h5>IT Security</h5>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="col-12 col-md-4 col-lg-3">
								<div class="large-col">
									<a href="search.html" class="large-col-image">
										<div class="image-col-merge">
											<img src={fd} alt="" />
											<div class="text-col">
												<h5>Front-End Developer</h5>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="col-12 col-md-4 col-lg-3">
								<div class="large-col">
									<a href="search.html" class="large-col-image">
										<div class="image-col-merge">
											<img src={wd} alt="" />
											<div class="text-col">
												<h5>Web Developer</h5>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="col-12 col-md-4 col-lg-3">
								<div class="large-col">
									<a href="search.html" class="large-col-image">
										<div class="image-col-merge">
											<img src={ad} alt=""/>
											<div class="text-col">
												<h5>Administrator</h5>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="col-12 col-md-4 col-lg-3">
								<div class="large-col">
									<a href="search.html" class="large-col-image">
										<div class="image-col-merge">
											<img src={pm} alt=""/>
											<div class="text-col">
												<h5>Project Manager</h5>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="col-12 col-md-4 col-lg-3">
								<div class="large-col">
									<a href="search.html" class="large-col-image">
										<div class="image-col-merge">
											<img src={pd} alt="" />
											<div class="text-col">
												<h5>PHP Developer</h5>
											</div>
										</div>
									</a>
								</div>
							</div>
                            <div class="view-all text-center" style={{margin:"auto"}}><a style={{color:"white"}} onClick={this.handleSignup} class="btn btn-primary">Register Now!!!</a></div>	
                        
						
                        </Row>

                    </div>
                </div>
            </section>

           {/* Statistics Section  */}
			<section class="section statistics-section">
				<div class="container" style={{width:"100%"}}>
					<Row>
						<div class="col-12 col-md-4">
							<div class="statistics-list text-center">
								<span>500+</span>
								<h3>Happy Clients</h3>
							</div>
						</div>
						<div class="col-12 col-md-4">
							<div class="statistics-list text-center">
								<span>120+</span>
								<h3>Online Appointments</h3>
							</div>
						</div>
						<div class="col-12 col-md-4">
							<div class="statistics-list text-center">
								<span>100%</span>
								<h3>Job Satisfaction</h3>
							</div>
						</div>
                    </Row>
				</div>
			</section>
			{/* <!-- /Statistics Section -->		 */}

            <footer class="footer">
				
				{/* <!-- Footer Top --> */}
				<div class="footer-top">
					<div class="container-fluid">
						<div class="row">
							<div class="col-lg-3 col-md-6">
							
								{/* <!-- Footer Widget --> */}
								<div class="footer-widget footer-about">
									<div class="footer-logo">
										<img src={LOGO} alt="logo" />
									</div>
									<div class="footer-about-content">
										<p>Our solution can address on your on-the job challenges at various phases of projects including Design, Reviews, debugging , troubleshooting , hot fixes and quick project needs. </p>
										<div class="social-icon">
											<ul>
                                           
                                            {/* <span className = "socials"> <a href = 'https://www.facebook.com/ekode.crux/'><AiFillFacebook/></a>
                <a href = 'https://www.instagram.com/ekodecrux/'><AiFillInstagram/> </a>
                <a href = 'https://twitter.com/ekodecrux/'><AiFillTwitterSquare/></a> 
                <a href = 'https://www.linkedin.com/in/ekode-crux-a59694208/'><AiFillLinkedin/></a> 
                <a href = 'https://www.quora.com/profile/Ekode-Crux'><FaQuora/></a> 
                <a href = 'https://medium.com/@ekodecrux'><AiFillMediumSquare/></a></span> */}
												<li>
                                                <a href = 'https://www.facebook.com/ekode.crux/'><FaFacebookF/></a>
												</li>
												<li>
                                                <a href = 'https://twitter.com/ekodecrux/'><FaTwitter/></a>
												</li>
												<li>
                                                <a href = 'https://www.linkedin.com/in/ekode-crux-a59694208/'><FaLinkedinIn/></a> 
												</li>
												<li>
                                                <a href = 'https://www.instagram.com/ekodecrux/'><FaInstagram/> </a>
												</li>
                                                <li>
                                                <a href = 'https://www.quora.com/profile/Ekode-Crux'><FaQuora/></a> 
                                                </li>
                                                <li>
                                                <a href = 'https://medium.com/@ekodecrux'><FaMediumM/></a>
                                                </li>
											</ul>
										</div>
									</div>
								</div>
								{/* <!-- /Footer Widget --> */}
								
							</div>
							
							<div class="col-lg-3 col-md-6">
							
								{/* <!-- Footer Widget --> */}
								<div class="footer-widget footer-menu">
									<h2 class="footer-title">For Mentee</h2>
									<ul>
										<li><a href="#">Search Mentors</a></li>
										<li><a href="#">Login</a></li>
										<li><a href="#">Register</a></li>
										<li><a href="#">Booking</a></li>
										<li><a href="#">Mentee Dashboard</a></li>
									</ul>
								</div>
								{/* <!-- /Footer Widget --> */}
								
							</div>
							
							<div class="col-lg-3 col-md-6">
							
								{/* <!-- Footer Widget --> */}
								<div class="footer-widget footer-menu">
									<h2 class="footer-title">For Mentors</h2>
									<ul>
										<li><a href="#">Appointments</a></li>
										<li><a href="#">Chat</a></li>
										<li><a href="#">Login</a></li>
										<li><a href="#">Register</a></li>
										<li><a href="#">Mentor Dashboard</a></li>
									</ul>
								</div>
								{/* <!-- /Footer Widget --> */}
								
							</div>
							
							<div class="col-lg-3 col-md-6">
							
								{/* <!-- Footer Widget --> */}
								<div class="footer-widget footer-contact">
									<h2 class="footer-title">Contact Us</h2>
									<div class="footer-contact-info">
										<div class="footer-address">
											<span><i class="fas fa-map-marker-alt"></i></span>
											<p> Expert aid technologies private limited Plot-44, Beeramguda, Hyderabad -502032 </p>
										</div>
										<p>
											<i class="fas fa-phone-alt"></i>
											+1 95730 17223
										</p>
										<p class="mb-0">
											<i class="fas fa-envelope"></i>
											support@ekodecrux.com
										</p>
									</div>
								</div>
								{/* <!-- /Footer Widget --> */}
								
							</div>
							
						</div>
					</div>
				</div>
				{/* <!-- /Footer Top --> */}
				
				{/* <!-- Footer Bottom --> */}
                <div class="footer-bottom">
					<div class="container-fluid">
					
						{/* <!-- Copyright --> */}
						<div class="copyright">
							<div class="row">
								<div class="col-12 text-center">
									<div class="copyright-text">
										<p class="mb-0">&copy; 2021 eKodeCrux. All rights reserved.</p>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- /Copyright --> */}
						
					</div>
				</div>
				{/* <!-- /Footer Bottom --> */}
				
			</footer>
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
