import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import './style.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import icon from '../../assets/images/reg2.jpeg'

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

class Pagetwo extends React.Component {

    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
        ],
      };

      handleCancel = () => this.setState({ previewVisible: false });

      handlePreview = async file => {
          console.log('file', file)
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
      };
    
      handleChange = ({ fileList }) => this.setState({ fileList });
    

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        return (


               
            <div className="registration__page__two">   
                <form className="registration__details__container">
                    <div className="registration__details__img" >
                        {/* <img src={icon} alt="KodeCrux"></img> */}
                        <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
                    <span style={{color:'grey', fontWeight: '500'}} >Profile Picture </span>
                    </div>  
                    <Col style={{marginTop:"10px"}}>
                        <div class="form__group">
                            <label >Pin Code</label>
                            <input className="form__control"  value={this.props.pincode} onChange={(e) => this.props.handelData('pincode', e.target.value)} type="text"   placeholder="Enter Your Postal Code" />
                        </div>
                        <div class="form__group">
                            <label >State</label>
                            <input type="text"  value={this.props.state} onChange={(e) => this.props.handelData('state', e.target.value)} className="form__control"  placeholder="Enter Your State" />
                        </div>
                        <div class="form__group">
                            <label >City</label>
                            <input type="text"  value={this.props.city} onChange={(e) => this.props.handelData('city', e.target.value)} className="form__control"  placeholder="Enter Your City" />
                        </div>

                        <div class="form__group">
                            <label >School</label>
                            <input type="text"  value={this.props.school} onChange={(e) => this.props.handelData('school', e.target.value)} className="form__control"  placeholder="Enter Your School" />
                        </div>
                    </Col>
                        
                    <Col className="registration__details__footer">
                        <button type="submit" onClick={this.props.onSubmit}>Done</button>
                        <div >
                            <span >By register I agree To</span>
                            <span><a style={{color:'#30b3f0',cursor:'pointer'}} >Term & Condition</a> and <a style={{color:'#30b3f0',cursor:'pointer'}} >Privacy policy</a></span>
                        </div>
                    </Col>
                    
                    
                </form>
            </div>
          



);
    }


}

export default Pagetwo