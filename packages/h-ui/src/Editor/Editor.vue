<template>
<div class="ck-editor-box" :id="`ck`+id">
  <div :id="id">
  </div>
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
      initCount: 0
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
    },
    value(val){
      if(val){
        if(this.initCount === 0 ){
          this.initCount = 1
          this.editor && this.editor.setData(val)
        }
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
      console.log('init-editor')
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
            window.editor = editor
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
            editor.model.document.on('change:data', (e) => {
              setTimeout(() => {
                const data = editor.getData();
                this.$emit('input', data)
              }, 20)
            })
            if(this.readonly || this.disabled){
              editor.enableReadOnlyMode('lock-id')
              } else {
              editor.disableReadOnlyMode('lock-id')
            }
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                return new MyUploadAdapter( loader );
            };
            // const plugin = editor.plugins.get( 'FileRepository' )
            // console.log('plugin', plugin)
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

<style>
.ck-editor-box .ck-content {
  min-height: 250px;
  max-height: 400px;
}
</style>