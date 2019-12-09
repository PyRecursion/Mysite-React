/*
富文本编辑器组件
 */

import React, { Component } from "react";
import E from "wangeditor";

class RichTextEditor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editorContent: "",
            editorText:''
        };
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        
        editor.customConfig.uploadFileName = "upfile"; //置上传接口的文本流字段
        editor.customConfig.uploadImgServer = "/img/upload"; //服务器接口地址
        editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
        // 限制一次最多上传 5 张图片
        editor.customConfig.uploadImgMaxLength = 5;
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        //editor.customConfig.uploadFileName = "yourFileName.jpg"; //自定义以图片名
        
        editor.customConfig.onchange =html => {
            this.setState({
                editorContent:html,
                editorText: editor.txt.text()   
            });
        };
        editor.create();
        
        // editor.customConfig.uploadImgHooks = {
            // before: function (xhr, editor, files) {
            //     // 图片上传之前触发
            //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                
            //     // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            //     // return {
            //     //     prevent: true,
            //     //     msg: '放弃上传'
            //     // }
            // },
            // success: function (xhr, editor, result) {
            //     if ( result.errno===0) {
            //         message('上传成功')
            //     }
            //     // 图片上传并返回结果，图片插入成功之后触发
            //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            // },
            // fail: function (xhr, editor, result) {
            //     console.log(result)
            //     // 图片上传并返回结果，但图片插入错误时触发
            //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            // },
            // error: function (xhr, editor) {
            //     // 图片上传出错时触发
            //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            // },
            // timeout: function (xhr, editor) {
            //     // 图片上传超时时触发
            //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            // },
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            // customInsert: function (insertImg, result, editor) {
            //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        
            //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            //     var url = result.url
            //     insertImg(url)
        
            //     // result 必须是一个 JSON 格式字符串！！！否则报错
            // }
           
            // }
        }
    
    // clickHandle() {
    //     alert(this.state.editorContent);
    //     // alert(editor.txt.text())
    // }
    //父组件获取内容
    geteditorContent=()=>this.state.editorContent
    // geteditorText=()=>this.state.editorText
    render() {
        // console.log('富文本编辑器的html内容',this.state.editorContent)
        return (
            <div>
                {/* 将生成编辑器 */}
                <div ref="editorElem" style={{ textAlign: "left" }}></div>
                {/* <button onClick={this.clickHandle.bind(this)}>获取内容</button> */}
            </div>
        );
    }
}

export default RichTextEditor;
