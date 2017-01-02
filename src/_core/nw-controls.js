require('./nw-init.js').default(self)

export default () => {
    if( !self.nw )
        return false
    console.log(nw.manifest)
}