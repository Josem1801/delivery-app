// SPDX-License-Identifier: MIT
//Version de solidity 
pragma solidity ^0.8.6;
pragma experimental ABIEncoderV2;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
contract RepartirDinero {
    
    //Variable 
    address owner;
    uint mesDePago;
    uint balance;
    
    //Tiempo 
    uint timeToPay;

    //Evento evitar 
    event TransferSent(address _from, address _destAddr, uint _amount);
    
    //modifier para evitar que alguien que no es el owner pueda ejecutar la funcion de pagar
    modifier soloPropietario(){
        require(msg.sender == owner);
        _;
    }
    
    constructor() {
        owner = msg.sender;
        timeToPay = block.timestamp + 1 minutes;
    }
    //Tipo de dato para un usuario
    struct User{
        string nombre;
        address billetera;
        uint points;
        bool immediateWithdrawal;
    }
    
    //Array para almacenar los usuarios que se encuentran
    User[] users;
    
    //Tipo de dato mapping para guardar a los usuarios y su billetera correspondiente
    mapping(string => address) public getAddress;
    
    function agregarUsuario(string memory _nombre, address _address) public soloPropietario{
        getAddress[_nombre] = _address;
        User memory newUser = User(_nombre, _address,  0, false);
        users.push(newUser);
    }
    
    function conocerNombre(string memory _nombre) public view returns(address) {
        return getAddress[_nombre];
    } 
    
    function listaDeUsuarios() public view returns(User[] memory){
        return users;
    }
    function transferERC20(IERC20 _token, address _to, uint _amount) public soloPropietario {
        balance = _token.balanceOf(address(this));
        _token.transfer(msg.sender, _amount);
        emit TransferSent(msg.sender, _to, _amount); 
    }
    function obtenerBalance(address _token) public returns(uint){
        IERC20 paymentToken = IERC20(_token);
        return paymentToken.balanceOf(address(this));
    }
    
    
    function timeLeft() public view returns(uint){
        return (block.timestamp - timeToPay);
    }
   
    function realizarPago(User[] memory _usersToPay,address _tokenAddress) public soloPropietario  returns(bool){
        require(address(owner).balance > 0 , "Al parecer no hay fondos :c");
        require(block.timestamp >= timeToPay, string(abi.encodePacked("El pago no puede ser realizado, faltan",  (block.timestamp - timeToPay))));
        
        uint totalPoints;
        for(uint i = 0; i < _usersToPay.length; i++ ){
            require(_usersToPay[i].billetera == getAddress[_usersToPay[i].nombre], "Un de los usuarios no existe");
            totalPoints += _usersToPay[i].points;
        }
        timeToPay = block.timestamp + 1 minutes;
        //Variable
        uint partesIguales = obtenerBalance(_tokenAddress);
        
        for(uint i =0; i<_usersToPay.length; i++){
            
        }
        return true;
    }
    
    
}