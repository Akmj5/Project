module.exports = the => (req,res,next) =>{
    Promise.resolve(the(req,res,next)).catch(next);
};