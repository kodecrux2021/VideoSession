import React, { Component, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'  
import './Home.css'
import codeexp from '../../assets/images/codeexpert.jpeg'
import instruc from '../../assets/images/instructor.jpeg'
import freelan from '../../assets/images/codeexpert.jpeg'
import study from '../../assets/images/study.jpeg'
import home1 from '../../assets/images/home1.jpg'
import home2 from '../../assets/images/home2.jpg'
import home3 from '../../assets/images/home3.jpg'
import home4 from '../../assets/images/home4.jpg'
import home5 from '../../assets/images/home5.jpg'
import Navbar from '../../components/Header/Navbar';
import {Modal} from 'antd';

export default class Home extends Component {
    state = {
        visible: false,
        title: '',
        content: null,

    }
    about = () =>{
        this.setState({visible: true,
        title: 'About Us',
        content: 'eKodecrux is a website for delivering IT services through its Developer market place.  We are making customers to find thier study and solution needs addressed by instant video/audio sessions or through structured E-learning marketplace'})
    }

    contact = () =>{
        this.setState({visible: true,
        title: 'Contact Us',
        content: <p>email - support@kodecrux.com<br/> Our Corporate Address -<br/> Expert aid technologies private limited Plot-44,<br/> Beeramguda,<br/> Hyderabad -502032</p>})
    }

    service= () =>{
        this.setState({visible: true,
        title: 'Product and Services',
        content: <p>eKodecrux is a market place for both training and solution services. It is a platform to facilitate transaction of these services for our customers. Through the Website, eKodecrux facilitates the availing services and try to best fit to the customer needs based on defined pricing matrix. Ecodecrux or expert aid technologies is the only market place and all instructors and external learning platforms are only onboarded virtually to support this platform and market place.
        <br/>
        <b>Below is the service catalogue</b><br/>
        <b>Study room</b> : To cater needs to IT graduate, Freshers, job seekers, on job employes in terms of certification, training, expert sessions, market place for e-training<br/>
        <b>Solution room</b> : To cater needs to IT graduate, Freshers, job seekers, on job employes in terms of on job expert advice, project reviews, project/web site creation services .</p>})
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
        Plot-44, Beeramguda, Hyderabad -502032</p>})
    }

    handleCancel = () =>{
       this.setState({visible: false})
      } 
    render() {

        return (
        <>
        <Navbar/>
        <div className='body__ctr'>
              <div className="home_container">
      <Carousel controls={false} interval={10000} indicators={false} pause={false} fade={true}>
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

        <div className="cards__container">
            <div className="_card">
                <img src={codeexp} alt=""/>
                <h3>
                    Code Expert
                </h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                     , when an unknown printer took
                </p>
            </div>

            <div className="_card">
                <img src={instruc} alt=""/>
                <h3>
                   Instructor
                </h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                     , when an unknown printer took
                </p>
            </div>
            <div className="_card">
                <img src={freelan} alt=""/>
                <h3>
                    Freelancer
                </h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                     , when an unknown printer took
                </p>
            </div>

            </div>

            <div className="blog__container">
            <div  style ={{display: 'inline'}}>
                    <div className= 'button__card__details'>
                        <h1>Blogs by Kodecrux</h1>
                        <h3>Topic</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <a><e>Read More...</e></a>
                        </p>
        
                    </div>
            </div>
            </div>

            <div className="button__container">
                
                <div className="button__card">
                    <div className="button__card__img">
                        <img src={study} alt="" />
                    </div>
                    <div className= 'button__card__details'>
                        <h2>Study Room</h2>
                        <p>ndustry's standard dummy text ever since the 1500s
                            , when an unknown printer took</p>
                        <button style={{  backgroundColor:' #5964c9'}} onClick={()=>this.props.history.push('/course-registration')} >Study Room</button>
                    </div>
              
                </div>
                <div className="button__card">
                    <div className="button__card__img">
                        <img src={study} alt="" />
                    </div>
                    <div className= 'button__card__details'>
                        <h2>Solution Room</h2>
                        <p>Industry's standard dummy text ever since the 1500s
                            , when an unknown printer took</p>
                        <button style={{  backgroundColor:' #76d2fd'}} onClick={()=>this.props.history.push('/help/1')} >Solution Room</button>
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