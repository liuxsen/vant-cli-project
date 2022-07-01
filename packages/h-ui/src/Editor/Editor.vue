<template>
<div :id="id">
</div>
</template>

<script>
import { insertScript, getRandomId } from '@fostars/utils'
export default {
  name: 'HEditor',
  props: {
    // 上传图片
    uploadFile: {
      type: Function,
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      id: 'editor' + getRandomId(),
    }
  },
  computed: {
    enbleStatus(){
      return this.disabled || this.readonly
    }
  },
  watch: {
    enbleStatus(val){
      if(val){
        this.editor && this.editor.enableReadOnlyMode('lock-id')
        } else {
        this.editor && this.editor.disableReadOnlyMode('lock-id')
      }
    }
  },
  mounted(){
    insertScript('https://pub-xinghunet-pro.oss-cn-shanghai-finance-1-pub.aliyuncs.com/lib/ckeditor/ckeditor.js', () => {
      this.initEditor()
    })
  },
  beforedestyed(){
    this.editor && this.editor.destroy()
  },
  methods: {
    async initEditor(){
      // const toolbars = [
      //   'insert',
      //   'alignleft aligncenter alignright alignjustify alignnone blockquote indent outdent italic',
      //   'fontfamily fontsize forecolor h1 h2 h3 h4 h5 h6 lineheight',
      //   'link image',
      //   'redo undo remove',
      //   'numlist bullist',
      //   'backcolor  blocks forecolor',
      //   'selectall copy cut paste pastetext print',
      //   'removeformat',
      //   'subscript superscript underline visualaid hr',
      //   'wordcount',
      // ]
      // const plugins = [
      //   'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'parse',
      //   'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      //   'insertdatetime', 'media', 'table', 'editimage', 'wordcount',
      // ]
      // await this.$nextTick()
      // tinymce.init({
      //   selector: `#${this.id}`,
      //   toolbar: toolbars.join(' | '),
      //   language: 'zh-Hans',
      //   branding: false,
      //   relative_urls: false,
      //   // https://stackoverflow.com/questions/17193624/remove-path-in-status-bar-in-tinymce4
      //   elementpath: false,
      //   content_css: './reset.css',
      // })
      let that = this;
      class MyUploadAdapter {
        constructor( loader ) {
            // The file loader instance to use during the upload.
            this.loader = loader;
        }

        // Starts the upload process.
        upload() {
            // // Update the loader's progress.
            // server.onUploadProgress( data => {
            //     loader.uploadTotal = data.total;
            //     loader.uploaded = data.uploaded;
            // } );

            // Return a promise that will be resolved when the file is uploaded.
            return this.loader.file
                .then( file => {
                  console.log(file)
                  return that.uploadFile(file)
                } );
        }

        // Aborts the upload process.
        abort() {
            // Reject the promise returned from the upload() method.
            // server.abortUpload();
        }
    }
      const watchdog = new CKSource.EditorWatchdog();
			window.watchdog = watchdog;
      watchdog.setCreator( ( element, config ) => {
				return CKSource.Editor
					.create( element, config )
					.then( editor => {
            this.editor = editor
            if(this.value){
              editor.setData(this.value)
            }
            const toolbarElement = editor.ui.view.toolbar.element;
            editor.on( 'change:isReadOnly', ( evt, propertyName, isReadOnly ) => {
                if ( isReadOnly ) {
                    toolbarElement.style.display = 'none';
                } else {
                    toolbarElement.style.display = 'flex';
                }
            } );
            console.log(editor)
            editor.model.document.on('change:data', (e) => {
              const data = editor.getData();
              console.log(data)
              this.$emit('input', data)
              // const htmlwirter = editor.engine
              // console.log(htmlwirter)
            })
            if(this.readonly || this.disabled){
              editor.enableReadOnlyMode('lock-id')
              } else {
              editor.disableReadOnlyMode('lock-id')
            }
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                return new MyUploadAdapter( loader );
            };
            const plugin = editor.plugins.get( 'FileRepository' )
            console.log('plugin', plugin)
						return editor;
					} )
			});
      watchdog.setDestructor( editor => {
				return editor.destroy();
			} );
      watchdog.on( 'error', handleError );
      watchdog
				.create(document.querySelector( '#'+this.id ), {
					licenseKey: '',
				})
				.catch( handleError );
      // console.log(watchdog.plugins.get)
      function handleError( error ) {
				console.error( 'Oops, something went wrong!' );
				console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
				console.warn( 'Build id: 5ur02d5vbjy4-ocwqi71g7zft' );
				console.error( error );
			}
    }
  }
}
</script>