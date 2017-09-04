import React from 'react'
import ReactDOM from 'react-dom'
import ReactAvatarEditor from '../dist/index'

class App extends React.Component {
    state = {
        allowZoomOut: true,
        position: {x: 0.5, y: 0.5},
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 300,
        height: 400,
        src:''
    }

    handleNewImage = e => {
        this.setState({image: e.target.files[0]})
    }

    handleSave = data => {
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        const rect = this.editor.getCroppingRect()



        this.setState({
            preview: {
                img,
                rect,
                scale: this.state.scale,
                width: this.state.width,
                height: this.state.height,
                borderRadius: this.state.borderRadius
            }
        });


        // Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
// var my_img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
// img.onclick = function(){
    modal.style.display = "block";


    modalImg.src = img;
    // captionText.innerHTML = this.alt;
// }

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
$('#closePicture').click(function() { 
    modal.style.display = "none";
});
    }

    handleScale = e => {
        const scale = parseFloat(e.target.value)
        this.setState({scale})
    }

    // handleAllowZoomOut = ({target: {checked: allowZoomOut}}) => {
    //     this.setState({allowZoomOut})
    // }

    switchHeightWidth() {
        let width = this.state.width;
        let height = this.state.height;
        this.setState({
                width: height,
                height: width
            }
        )
    }

    rotateLeft = e => {
        e.preventDefault();

        this.setState({
            rotate: this.state.rotate - 90,
        })
        this.switchHeightWidth();
    }

    rotateRight = e => {
        e.preventDefault()
        this.setState({
            rotate: this.state.rotate + 90
        })

        this.switchHeightWidth();
    }

    // handleBorderRadius = e => {
    //   const borderRadius = parseInt(e.target.value)
    //   this.setState({ borderRadius })
    // }

    // handleXPosition = e => {
    //   const x = parseFloat(e.target.value)
    //   this.setState({ position: { ...this.state.position, x } })
    // }
    //
    // handleYPosition = e => {
    //   const y = parseFloat(e.target.value)
    //   this.setState({ position: { ...this.state.position, y } })
    // }

    // handleWidth = e => {
    //   const width = parseInt(e.target.value)
    //   this.setState({ width })
    // }
    //
    // handleHeight = e => {
    //   const height = parseInt(e.target.value)
    //   this.setState({ height })
    // }

    logCallback(e) {
        console.log('callback', e)
    }

    setEditorRef = editor => {
        if (editor) this.editor = editor
    }

    handlePositionChange = position => {
        console.log('Position set to', position)
        this.setState({position})
    }

    handleUploadModal=(e)=>{
         this.setState({ src: this.editor.getImageScaledToCanvas().toDataURL()})
        $('#uploadModal').modal();
    }

    render() {
        return (
            <div className="card col-sm-12" style={{float:'none', margin:'0 auto' }}>
                <div style={{  paddingLeft: 0,
                    paddingRight: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingTop: '10px',
                    width: '350px',
                    display: 'block'}}>
                <ReactAvatarEditor
                    ref={this.setEditorRef}
                    scale={parseFloat(this.state.scale)}
                    width={this.state.width}
                    height={this.state.height}
                    position={this.state.position}
                    onPositionChange={this.handlePositionChange}
                    rotate={parseFloat(this.state.rotate)}
                    borderRadius={this.state.borderRadius}
                    onSave={this.handleSave}
                    onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                    onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                    onImageReady={this.logCallback.bind(this, 'onImageReady')}
                    onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
                    onDropFile={this.logCallback.bind(this, 'onDropFile')}
                    image={this.state.image || 'avatar.jpg'}
                />
                <br />
                <input name='newImage' type='file' onChange={this.handleNewImage}/>
                <br />
                Zoom: <input
                    className="btn btn-success"
                    name='scale'
                    type='range'
                    onChange={this.handleScale}
                    min={this.state.allowZoomOut ? '0.1' : '1'}
                    max='3'
                    step='0.01'
                    defaultValue='1'
                />
                {/*<br />*/}
                {/*Tự động điều chỉnh*/}
                {/*<input*/}
                    {/*name='allowZoomOut'*/}
                    {/*type='checkbox'*/}
                    {/*onChange={this.handleAllowZoomOut}*/}
                    {/*checked={this.state.allowZoomOut}*/}
                {/*/>*/}
                <br/>
                {/*Border radius:*/}
                {/*<input*/}
                {/*name='scale'*/}
                {/*type='range'*/}
                {/*onChange={this.handleBorderRadius}*/}
                {/*min='0'*/}
                {/*max='100'*/}
                {/*step='1'*/}
                {/*defaultValue='0'*/}
                {/*/>*/}
                {/*Avatar Width:*/}
                {/*<input*/}
                {/*name='width'*/}
                {/*type='number'*/}
                {/*onChange={this.handleWidth}*/}
                {/*min='50'*/}
                {/*max='400'*/}
                {/*step='10'*/}
                {/*value={this.state.width}*/}
                {/*/>*/}
                {/*<br />*/}
                {/*Avatar Height:*/}
                {/*<input*/}
                {/*name='height'*/}
                {/*type='number'*/}
                {/*onChange={this.handleHeight}*/}
                {/*min='50'*/}
                {/*max='400'*/}
                {/*step='10'*/}
                {/*value={this.state.height}*/}
                {/*/>*/}
                {/*X Position:*/}
                {/*<input*/}
                {/*name='scale'*/}
                {/*type='range'*/}
                {/*onChange={this.handleXPosition}*/}
                {/*min='0'*/}
                {/*max='1'*/}
                {/*step='0.01'*/}
                {/*value={this.state.position.x}*/}
                {/*/>*/}
                {/*<br />*/}
                {/*Y Position:*/}
                {/*<input*/}
                {/*name='scale'*/}
                {/*type='range'*/}
                {/*onChange={this.handleYPosition}*/}
                {/*min='0'*/}
                {/*max='1'*/}
                {/*step='0.01'*/}
                {/*value={this.state.position.y}*/}
                {/*/>*/}
                {/*<br />*/}
                <button className="btn btn-info" style={{ border: '1px solid rgb(255, 255, 255)'}} onClick={this.rotateLeft}>Xoay trái</button>
                 <button className="btn btn-info" style={{ border: '1px solid rgb(255, 255, 255)'}} onClick={this.rotateRight}>Xoay phải</button>
                <br/><hr />
                    <input className="btn btn-default text-center" type='button' onClick={this.handleSave} value='Xem trước'/>
                    <button className="btn btn-success text-center" onClick={this.handleUploadModal}> Upload ảnh </button>
                <br/><br/>
                    {/*className="img img-thumbnail"*/}
                    {!!this.state.preview &&
                <img
                    id="myImg"
                    style={{overflow: 'hidden', display: 'none', visibility: 'hidden'}}
                    src={this.state.preview.img}

                />}
                    {/*style={{*/}
                    {/*borderRadius: `${(Math.min(*/}
                        {/*this.state.preview.height,*/}
                        {/*this.state.preview.width*/}
                    {/*) +*/}
                    {/*10) **/}
                    {/*(this.state.preview.borderRadius / 2 / 100)}px`*/}
                {/*}}*/}
                {/*{!!this.state.preview &&*/}
                {/*<ImageWithRect*/}
                {/*width={*/}
                {/*this.state.preview.scale < 1*/}
                {/*? this.state.preview.width*/}
                {/*: this.state.preview.height * 478 / 270*/}
                {/*}*/}
                {/*height={this.state.preview.height}*/}
                {/*image='avatar.jpg'*/}
                {/*rect={this.state.preview.rect}*/}
                {/*style={{*/}
                {/*margin: '10px 24px 32px',*/}
                {/*padding: 5,*/}
                {/*border: '1px solid #CCC'*/}
                {/*}}*/}
                {/*/>}*/}
                </div>
                <ModalUpload image={this.state.src}/>
            </div>
        )
    }
}

// Used to display the cropping rect
// class ImageWithRect extends React.Component {
//   componentDidMount () {
//     this.redraw()
//   }
//
//   componentDidUpdate () {
//     this.redraw()
//   }
//
//   setCanvas = (canvas) => {
//     if (canvas) this.canvas = canvas
//   }
//
//   handleImageLoad = () => {
//     const ctx = this.canvas.getContext('2d')
//     const { rect, width, height } = this.props
//
//     ctx.clearRect(0, 0, width, height)
//
//     ctx.strokeStyle = 'red'
//
//     if (rect && (rect.width > 1 || rect.height > 1)) {
//       ctx.drawImage(
//         this.imgElement,
//         Math.round(-rect.x * (width / rect.width)),
//         Math.round(-rect.y * (height / rect.height)),
//         Math.round(width / rect.width),
//         Math.round(height / rect.height)
//       )
//
//       if (rect) {
//         ctx.strokeRect(1, 1, Math.round(width) - 2, Math.round(height) - 2)
//       }
//     } else {
//       ctx.drawImage(this.imgElement, 0, 0, width, height)
//
//       if (rect) {
//         ctx.strokeRect(
//           Math.round(rect.x * width) + 0.5,
//           Math.round(rect.y * height) + 0.5,
//           Math.round(rect.width * width),
//           Math.round(rect.height * height)
//         )
//       }
//     }
//   }
//
//   redraw () {
//     const img = new Image()
//
//     img.src = this.props.image
//     img.onload = this.handleImageLoad
//     this.imgElement = img
//   }
//
//   render () {
//     return (
//       <canvas
//         ref={this.setCanvas}
//         style={this.props.style}
//         width={this.props.width}
//         height={this.props.height}
//       />
//     )
//   }
// }

class ModalUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            idNo:'',
            dayOfIssue:''
        }
        
        this.handleSubmitImage = this.handleSubmitImage.bind(this);
    }

    onIdNoChange=(e)=>{
        this.setState({
        idNo: e.target.value
      })  
    }

     ondayOfIssueChange=(e)=>{
      this.setState({
        dayOfIssue: e.target.value
      })
    }

    handleSubmitImage=(e)=>{
        e.preventDefault();
        console.log('here',this.props.image);
    }

    render() {
        return (<div className="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
                     aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form method="POST" action="team/edit">
                            <div className="modal-header">
                                <button type="button" className="close modal-title close-modal" data-dismiss="modal" style={{
                                    position: 'absolute !important',
                                    top: '0 !important',
                                    right: '8px !important'}}>
                                    <span aria-hidden="true">×</span><span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label for="event">Số Chứng Minh Nhân Dân </label>
                                    <input type="number" className="form-control" id="idNo" name="idNo" onChange={this.onIdNoChange} value={this.state.idNo} required/>

                                </div>
                                <div className="form-group">
                                    <label for="team">Ngày cấp (định dạng: ddMMyyyy) </label>
                                    <input type="password" className="form-control" id="dayOfIssue" name="dayOfIssue" onChange={this.ondayOfIssueChange} value={this.state.dayOfIssue} required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="btn-group btn-group-justified" role="group" aria-label="group button">
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal" role="button">Close</button>
                                    </div>
                                    <div className="btn-group" role="group">
                                        <button type="submit" id="" className="btn btn-info waves-effect"
                                                onClick={this.handleSubmitImage} role="button">Upload ảnh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
