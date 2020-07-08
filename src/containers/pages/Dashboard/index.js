import React, { Component, Fragment } from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI, updateDataFromAPI, deleteDataFromAPI } from '../../../config/redux/action';
import { database } from 'firebase';
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid)

    }

    handleSaveNotes = () => {
        const { title, content, textButton, noteId } = this.state;
        const { saveNotes, updateNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if (title === '' && content === '') {
            alert('Judul dan Konten tidak boleh kosong !')
        } else if (title === '') {
            alert('Judul tidak boleh kosong !')
        } else if (content === '') {
            alert('Konten tidak boleh kosong !')
        } else {
            if (textButton === 'SIMPAN') {
                saveNotes(data)
            } else {
                data.noteId = noteId;
                updateNotes(data);
            }
            this.setState({
                title: '',
                content: '',
                date: '',
                textButton: 'SIMPAN'
            })
        }
        console.log(data)
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    updateNotes = (note) => {
        this.setState({
            title: note.data.title,
            content: note.data.content,
            date: note.data.date,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            date: '',
            textButton: 'SIMPAN'
        })
    }

    deleteNotes = (e, note) => {
        const { deleteNotes } = this.props;
        e.stopPropagation();
        const confirm = window.confirm("Apakah kamu yakin akan menghapus note ini?");
        if (confirm) {

            const userData = JSON.parse(localStorage.getItem('userData'));
            const data = {
                userId: userData.uid,
                noteId: note.id,
            }
            deleteNotes(data);
        }
    }

    handleLogout = () => {
        localStorage.removeItem('userData')
        localStorage.removeItem('firebase:host:simple-notes-firebase0.firebaseio.com')
        this.props.history.push('/login')
    }

    render() {
        const { title, content, date, textButton } = this.state;
        const { notes } = this.props;
        console.log('notes', notes)

        return (
            <div className="container">
                <div className="input-form">
                    <input placeholder="Judul" className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea placeholder="Tulis sesuatu..." className="input-content" value={content} onChange={(e) => this.onInputChange(e, 'content')} >

                    </textarea>
                    <div className="action-wrapper">
                        {
                            textButton === 'UPDATE' ? (
                                <button className="save-btn cancel" onClick={this.cancelUpdate}>CANCEL</button>
                            ) : null
                        }
                        <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                    </div>
                </div>
                <hr />
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    // const tanggal = { note.data.date }.getDate();
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => this.updateNotes(note)} >
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e) => this.deleteNotes(e, note)}>X</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
                <button className="logout-btn" onClick={this.handleLogout}>Logout</button>
            </div >
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataFromAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataFromAPI(data)),

})


export default connect(reduxState, reduxDispatch)(withRouter(Dashboard));