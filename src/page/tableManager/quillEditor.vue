<template>
    <div>
        <head-top></head-top>
        <div class="edit_container">
        	<quill-editor v-model="content"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event)">
  			</quill-editor>
        </div>
        <div class="submit_btn">
  			<el-button type="primary" @click="submit">提交</el-button>
        </div>
        <div class="editer_content">
            <h3>这里会显示编辑好的内容</h3>
            <div id="editer_content"></div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                content: '',
			    editorOption: {			        
		        }
            }
        },
    	components: {
    		headTop,
    		quillEditor,
    	},
        computed: {
          	editor() {
	        	return this.$refs.myQuillEditor.quill
	      	}
        },
        methods: {
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
		    submit(){
                // console.log(this.content);
                this.$message.success('提交成功！');
                document.getElementById('editer_content').innerHTML= this.content
            }
        },
    }
</script>

<style lang="scss">
	.edit_container{
		padding: 30px;
		margin-bottom: 40px;
	}
	.editer{
		height: 200px;
	}
	.submit_btn{
		text-align: center;
	}
    .editer_content{
        margin:30px;
    }
    #editer_content{
        line-height: 1em;
        height: 300px;
        overflow: auto;
        background-color: #ccc
    }
</style>
