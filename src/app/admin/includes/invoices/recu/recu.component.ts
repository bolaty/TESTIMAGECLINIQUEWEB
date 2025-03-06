import { Component } from '@angular/core';

@Component({
  selector: 'app-recu',
  templateUrl: './recu.component.html',
  styleUrls: ['./recu.component.scss'],
})
export class RecuComponent {
  num_dossier: any;
  matricule: any;
  nom_prenoms: any;
  tel: any = '';
  acte: any = '';
  statut: any = '';
  assurance: any = '';
  label_1: any = '';
  label_2: any = '';

  total_facture: any;
  session_recu_op: any = JSON.parse(
    sessionStorage.getItem('recu_operation') || '[]'
  );
  session_de_connexion: any = JSON.parse(
    sessionStorage.getItem('donnee_de_connexion') || '{}'
  );

  ImprimerLetat() {
    window.print();
  }

  ngOnInit(): void {

   if(this.session_recu_op[0]['NUMEROBORDEREAU']){


       // @ts-ignore
     /* this.session_recu_op.forEach((element) => {
        element['MC_MONTANTCREDIT'] = parseInt(
          element['MC_MONTANTCREDIT'].split('.')[0]
        );
      });*/

      this.total_facture = 0;
      //@ts-ignore
      this.total_facture = this.session_recu_op.reduce(
        (a: any, b: any) => a + b.MC_MONTANTCREDIT,
        0
      );

      if (this.session_recu_op[0]["objetEnvoi"]["Objet"][0][
        "TABLEMODEREGLEMENT"
      ][0]['MC_LIBELLEOPERATION'].includes('|')) {
        const [
          _num_dossier,
          _matricule,
          _nom_prenoms,
          _tel,
          _statut
        ] = this.session_recu_op[0]["objetEnvoi"]["Objet"][0][
          "TABLEMODEREGLEMENT"
        ][0]['MC_LIBELLEOPERATION'].split('|');
  
        this.num_dossier = _num_dossier.split(':')[2].trim();
        this.matricule = _matricule.split(':')[1].trim();
        this.nom_prenoms = _nom_prenoms.split(':')[1].trim();
        this.tel = _tel.split(':')[1].trim();
        this.statut = _statut.split(':')[1].trim();
  
        console.log([
          _num_dossier,
          _matricule,
          _nom_prenoms,
          _tel,
          _statut
        ]);
      }


      
   }else{
    if (!this.session_recu_op[0]['NUMEROBORDEREAUREGLEMENT']) {
      // dans le cas de la reedition

      // @ts-ignore
      this.session_recu_op.forEach((element) => {
        element['MC_MONTANTCREDIT'] = parseInt(
          element['MC_MONTANTCREDIT'].split('.')[0]
        );
      });

      this.total_facture = 0;
      //@ts-ignore
      this.total_facture = this.session_recu_op.reduce(
        (a: any, b: any) => a + b.MC_MONTANTCREDIT,
        0
      );
    }

    if (this.session_recu_op[0]['MC_LIBELLEOPERATION'].includes('|')) {
      const [
        _num_dossier,
        _matricule,
        _nom_prenoms,
        _tel,
        _acte,
        _statut,
        _assurance,
        _label,
      ] = this.session_recu_op[0]['MC_LIBELLEOPERATION'].split('|');

      this.num_dossier = _num_dossier.split(':')[2].trim();
      this.matricule = _matricule.split(':')[1].trim();
      this.nom_prenoms = _nom_prenoms.split(':')[1].trim();
      this.tel = _tel.split(':')[1].trim();
      this.acte = _acte.split(':')[1].trim();
      this.statut = _statut.split(':')[1].trim();
      this.assurance = _assurance.split(':')[1].trim();
      this.label_1 = _label.split(':')[1].trim();
      this.label_2 = _label.split(':')[2]?.trim();

      console.log([
        _num_dossier,
        _matricule,
        _nom_prenoms,
        _tel,
        _acte,
        _statut,
        _assurance,
        _label,
      ]);
    }

    if (
      this.session_recu_op[0]['objetEnvoi']['Objet'][0][
        'TABLEMODEREGLEMENT'
      ][0]['MC_MONTANT_CONSTATIONFACTURE']
    ) {
      this.session_recu_op[0]['objetEnvoi']['Objet'][0][
        'TABLEMODEREGLEMENT'
      ][0]['MC_MONTANT_FACTURE'] =
        this.session_recu_op[0]['objetEnvoi']['Objet'][0][
          'TABLEMODEREGLEMENT'
        ][0]['MC_MONTANT_CONSTATIONFACTURE'];
    }

    console.log('session_recu_op', this.session_recu_op);
   }


  
  }
}
