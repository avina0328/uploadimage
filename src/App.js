import React, { PureComponent } from 'react'

export default class UploadFile extends PureComponent {
    state = {
        
        path: '',
        preview: null,
        data: null
    }

   

    //选择文件
    changePath = (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log('未选择文件');
            return;
             }

        let src,preview,type=file.type;
        
        // 匹配类型为image/开头的字符串
        if (/^image\/\S+$/.test(type)) {
            src = URL.createObjectURL(file)
            preview = <img src={src} alt='' />
        
        }
        // 匹配类型为text/开头的字符串
       else if (/^text\/\S+$/.test(type)) {
            const self = this;
            const reader = new FileReader();
            reader.readAsText(file);
            //注：onload是异步函数，此处需独立处理
            reader.onload = function (e) {
                preview = <textarea value={this.result} readOnly></textarea>
                self.setState({ data: file, preview: preview })
            }
            return;
        } 

        this.setState({ data: file, preview: preview })
    }

    // 上传文件
    upload = () => {
        
        const data = this.state.data;
        if (!data) {
            console.log('未选择文件');
            return;
        }

        //此处的url应该是服务端提供的上传文件api 
        const url = 'http://localhost:3000/api/upload';
        const form = new FormData();

        //此处的file字段由上传的api决定，可以是其它值
        form.append('file', data);

        fetch(url, {
            method: 'POST',
            body: form
        }).then(res => {
            console.log(res)
        })
    }

   

    render() {
        const { preview } = this.state;
        return (
          <div>
                <div className='row'>
                    
                    <div className='row-input'>
                       
                    <input type='file' accept='image/*' onChange={this.changePath} />
                    </div>
                </div>
                <div className='media'>
                   {preview}
                </div>
                                
            </div>
        )
    }
}

