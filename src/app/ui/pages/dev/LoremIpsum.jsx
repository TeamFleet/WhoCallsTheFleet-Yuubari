import React from 'react'
import { connect } from 'react-redux'
import { ImportStyle } from 'sp-css-import'
import { pageinfo } from 'super-project'

import htmlHead from '@utils/html-head'

import Page from '@ui/containers/page'
import CenterContainer from '@ui/containers/center'

import Title from '@ui/components/title'

@connect()
@pageinfo(() => htmlHead({
    title: 'Dev (lorem ipsum)'
}))
@ImportStyle(require('./LoremIpsum.less'))
export default class extends React.Component {
    render() {
        return (
            <Page className={this.props.className}>
                <CenterContainer>
                    <Title component="h1">Qui est in parvis malis.</Title>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Res enim concurrent contrariae. Quodsi ipsam honestatem undique pertectam atque absolutam. <i>Minime vero istorum quidem, inquit.</i> Vitae autem degendae ratio maxime quidem illis placuit quieta. </p>

                    <Title component="h5">Atqui, inquam, Cato, si istud optinueris, traducas me ad te totum licebit.</Title>

                    <p>Quamvis enim depravatae non sint, pravae tamen esse possunt. Graecis hoc modicum est: Leonidas, Epaminondas, tres aliqui aut quattuor; Tum Piso: Quoniam igitur aliquid omnes, quid Lucius noster? <b>Nunc agendum est subtilius.</b> Quid censes in Latino fore? Cetera illa adhibebat, quibus demptis negat se Epicurus intellegere quid sit bonum. <b>Sedulo, inquam, faciam.</b> <code>Sed ad illum redeo.</code> <mark>Suo genere perveniant ad extremum;</mark> </p>

                    <p>Omnia contraria, quos etiam insanos esse vultis. <i>Qui convenit?</i> A quibus propter discendi cupiditatem videmus ultimas terras esse peragratas. Et quidem illud ipsum non nimium probo et tantum patior, philosophum loqui de cupiditatibus finiendis. Cum salvum esse flentes sui respondissent, rogavit essentne fusi hostes. Mihi enim satis est, ipsis non satis. Utrum igitur tibi litteram videor an totas paginas commovere? Itaque his sapiens semper vacabit. </p>

                    <ol>
                        <li>Tum Piso: Quoniam igitur aliquid omnes, quid Lucius noster?</li>
                        <li>Qui autem esse poteris, nisi te amor ipse ceperit?</li>
                        <li>Inscite autem medicinae et gubernationis ultimum cum ultimo sapientiae comparatur.</li>
                        <li>Hoc loco tenere se Triarius non potuit.</li>
                        <li>Audax negotium, dicerem impudens, nisi hoc institutum postea translatum ad philosophos nostros esset.</li>
                        <li>Si est nihil nisi corpus, summa erunt illa: valitudo, vacuitas doloris, pulchritudo, cetera.</li>
                        <li>Perturbationes autem nulla naturae vi commoventur, omniaque ea sunt opiniones ac iudicia levitatis.</li>
                    </ol>


                    <p>Tu vero, inquam, ducas licet, si sequetur; Itaque a sapientia praecipitur se ipsam, si usus sit, sapiens ut relinquat. <i>Omnia contraria, quos etiam insanos esse vultis.</i> <mark>Equidem e Cn.</mark> Quare conare, quaeso. <a href="http://loripsum.net/" target="_blank">Quis istud, quaeso, nesciebat?</a> Ergo adhuc, quantum equidem intellego, causa non videtur fuisse mutandi nominis. Nunc omni virtuti vitium contrario nomine opponitur. <a href="http://loripsum.net/" target="_blank">Erit enim mecum, si tecum erit.</a> </p>

                    <p><mark>Verum hoc idem saepe faciamus.</mark> Nihil opus est exemplis hoc facere longius. Neque solum ea communia, verum etiam paria esse dixerunt. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. <a href="http://loripsum.net/" target="_blank">Summae mihi videtur inscitiae.</a> Nunc ita separantur, ut disiuncta sint, quo nihil potest esse perversius. </p>

                    <p>Quo modo autem optimum, si bonum praeterea nullum est? <i>Restinguet citius, si ardentem acceperit.</i> </p>

                    <p>Sed erat aequius Triarium aliquid de dissensione nostra iudicare. Qui autem esse poteris, nisi te amor ipse ceperit? <i>Ne discipulum abducam, times.</i> Quo plebiscito decreta a senatu est consuli quaestio Cn. </p>

                    <p><code>Invidiosum nomen est, infame, suspectum.</code> Primum quid tu dicis breve? <a href="http://loripsum.net/" target="_blank">Tum Torquatus: Prorsus, inquit, assentior;</a> Non est enim vitium in oratione solum, sed etiam in moribus. Urgent tamen et nihil remittunt. Odium autem et invidiam facile vitabis. <b>Quis hoc dicit?</b> Maximas vero virtutes iacere omnis necesse est voluptate dominante. Graecum enim hunc versum nostis omnes-: Suavis laborum est praeteritorum memoria. Quid de Platone aut de Democrito loquar? </p>

                    <ol>
                        <li>Sed ad bona praeterita redeamus.</li>
                        <li>Idemne, quod iucunde?</li>
                        <li>Quantam rem agas, ut Circeis qui habitet totum hunc mundum suum municipium esse existimet?</li>
                        <li>Earum etiam rerum, quas terra gignit, educatio quaedam et perfectio est non dissimilis animantium.</li>
                    </ol>


                    <p>Primum in nostrane potestate est, quid meminerimus? Quis non odit sordidos, vanos, leves, futtiles? Quia dolori non voluptas contraria est, sed doloris privatio. <i>Si longus, levis.</i> <code>Moriatur, inquit.</code> Non est igitur summum malum dolor. Sint modo partes vitae beatae. Eaedem enim utilitates poterunt eas labefactare atque pervertere. Quid ergo hoc loco intellegit honestum? </p>

                    <p>Illa videamus, quae a te de amicitia dicta sunt. Mihi enim erit isdem istis fortasse iam utendum. <i>Comprehensum, quod cognitum non habet?</i> <a href="http://loripsum.net/" target="_blank">Hoc simile tandem est?</a> Apparet statim, quae sint officia, quae actiones. </p>

                    <Title component="h2">Nam Pyrrho, Aristo, Erillus iam diu abiecti.</Title>

                    <p>Quamquam in hac divisione rem ipsam prorsus probo, elegantiam desidero. Est enim tanti philosophi tamque nobilis audacter sua decreta defendere. Quid de Platone aut de Democrito loquar? Duo enim genera quae erant, fecit tria. <code>Sed ille, ut dixi, vitiose.</code> <b>Frater et T.</b> Nam ista vestra: Si gravis, brevis; Quae hic rei publicae vulnera inponebat, eadem ille sanabat. Sed videbimus. Idque testamento cavebit is, qui nobis quasi oraculum ediderit nihil post mortem ad nos pertinere? </p>

                    <pre>Est autem a te semper dictum nec gaudere quemquam nisi
propter corpus nec dolere.

Praeterea sublata cognitione et scientia tollitur omnis
ratio et vitae degendae et rerum gerendarum.</pre>


                    <dl>
                        <dt><dfn>Quare conare, quaeso.</dfn></dt>
                        <dd>Nihil minus, contraque illa hereditate dives ob eamque rem laetus.</dd>
                        <dt><dfn>Hunc vos beatum;</dfn></dt>
                        <dd>Scisse enim te quis coarguere possit?</dd>
                        <dt><dfn>Beatum, inquit.</dfn></dt>
                        <dd>Certe, nisi voluptatem tanti aestimaretis.</dd>
                        <dt><dfn>Qui convenit?</dfn></dt>
                        <dd>Qua ex cognitione facilior facta est investigatio rerum occultissimarum.</dd>
                    </dl>


                    <Title component="h3">Scaevola tribunus plebis ferret ad plebem vellentne de ea re quaeri.</Title>

                    <p><a href="http://loripsum.net/" target="_blank">Id enim natura desiderat.</a> Et quidem Arcesilas tuus, etsi fuit in disserendo pertinacior, tamen noster fuit; Commoda autem et incommoda in eo genere sunt, quae praeposita et reiecta diximus; <b>Qualem igitur hominem natura inchoavit?</b> Quamquam haec quidem praeposita recte et reiecta dicere licebit. Multa sunt dicta ab antiquis de contemnendis ac despiciendis rebus humanis; Quid vero? </p>

                    <ul>
                        <li>Et nunc quidem quod eam tuetur, ut de vite potissimum loquar, est id extrinsecus;</li>
                        <li>Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit;</li>
                        <li>Nummus in Croesi divitiis obscuratur, pars est tamen divitiarum.</li>
                        <li>Utrum igitur tibi litteram videor an totas paginas commovere?</li>
                    </ul>


                    <Title component="h4">Non potes, nisi retexueris illa.</Title>

                    <p><i>Quid, de quo nulla dissensio est?</i> Quasi ego id curem, quid ille aiat aut neget. Nescio quo modo praetervolavit oratio. <a href="http://loripsum.net/" target="_blank">Negat enim summo bono afferre incrementum diem.</a> <a href="http://loripsum.net/" target="_blank">Collatio igitur ista te nihil iuvat.</a> <i>Negare non possum.</i> Hunc vos beatum; Quid sequatur, quid repugnet, vident. </p>

                    <dl>
                        <dt><dfn>Moriatur, inquit.</dfn></dt>
                        <dd>Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt.</dd>
                        <dt><dfn>Itaque fecimus.</dfn></dt>
                        <dd>Memini vero, inquam;</dd>
                    </dl>


                    <ul>
                        <li>Primum Theophrasti, Strato, physicum se voluit;</li>
                        <li>Voluptatem cum summum bonum diceret, primum in eo ipso parum vidit, deinde hoc quoque alienum;</li>
                        <li>Mene ergo et Triarium dignos existimas, apud quos turpiter loquare?</li>
                    </ul>


                    <p>Videsne quam sit magna dissensio? At enim sequor utilitatem. Quid autem habent admirationis, cum prope accesseris? Quae quo sunt excelsiores, eo dant clariora indicia naturae. <mark>Id Sextilius factum negabat.</mark> <a href="http://loripsum.net/" target="_blank">Perge porro;</a> Iis igitur est difficilius satis facere, qui se Latina scripta dicunt contemnere. Quae contraria sunt his, malane? </p>

                    <p>Non est ista, inquam, Piso, magna dissensio. Respondent extrema primis, media utrisque, omnia omnibus. Philosophi autem in suis lectulis plerumque moriuntur. Universa enim illorum ratione cum tota vestra confligendum puto. Et quidem iure fortasse, sed tamen non gravissimum est testimonium multitudinis. <i>Tollenda est atque extrahenda radicitus.</i> <i>Memini me adesse P.</i> </p>

                    <pre>Numquam hoc ita defendit Epicurus neque Metrodorus aut
quisquam eorum, qui aut saperet aliquid aut ista didicisset.

Illis videtur, qui illud non dubitant bonum dicere -;</pre>


                    <p>Quem si tenueris, non modo meum Ciceronem, sed etiam me ipsum abducas licebit. <a href="http://loripsum.net/" target="_blank">Aliter enim explicari, quod quaeritur, non potest.</a> Duo enim genera quae erant, fecit tria. <i>Itaque ad tempus ad Pisonem omnes.</i> Qui autem esse poteris, nisi te amor ipse ceperit? Ratio quidem vestra sic cogit. Quod idem cum vestri faciant, non satis magnam tribuunt inventoribus gratiam. Verum esto: verbum ipsum voluptatis non habet dignitatem, nec nos fortasse intellegimus. <mark>Sed ad illum redeo.</mark> Hanc quoque iucunditatem, si vis, transfer in animum; </p>

                    <blockquote cite="http://loripsum.net">
                        Qui bonum omne in virtute ponit, is potest dicere perfici beatam vitam perfectione virtutis;
                    </blockquote>


                    <p>Nam, ut sint illa vendibiliora, haec uberiora certe sunt. <i>Eam stabilem appellas.</i> <code>Si longus, levis.</code> <code>Sint ista Graecorum;</code> </p>

                    <p>Quod quidem iam fit etiam in Academia. Potius inflammat, ut coercendi magis quam dedocendi esse videantur. Quod ea non occurrentia fingunt, vincunt Aristonem; <a href="http://loripsum.net/" target="_blank">Mihi, inquam, qui te id ipsum rogavi?</a> Sed haec in pueris; Non ego tecum iam ita iocabor, ut isdem his de rebus, cum L. Non dolere, inquam, istud quam vim habeat postea videro; <a href="http://loripsum.net/" target="_blank">Haec quo modo conveniant, non sane intellego.</a> </p>

                    <p>Hoc mihi cum tuo fratre convenit. Duo Reges: constructio interrete. <b>Sed haec nihil sane ad rem;</b> Nihilne est in his rebus, quod dignum libero aut indignum esse ducamus? Gerendus est mos, modo recte sentiat. Vidit Homerus probari fabulam non posse, si cantiunculis tantus irretitus vir teneretur; Quippe: habes enim a rhetoribus; <b>Haeret in salebra.</b> Stoicos roga. Aliter enim nosmet ipsos nosse non possumus. Bonum incolumis acies: misera caecitas. </p>

                    <ul>
                        <li>Satisne vobis videor pro meo iure in vestris auribus commentatus?</li>
                        <li>Qui igitur convenit ab alia voluptate dicere naturam proficisci, in alia summum bonum ponere?</li>
                        <li>Quamquam tu hanc copiosiorem etiam soles dicere.</li>
                        <li>Tu vero, inquam, ducas licet, si sequetur;</li>
                        <li>Ita ne hoc quidem modo paria peccata sunt.</li>
                        <li>Quo tandem modo?</li>
                    </ul>


                    <p>Deinde prima illa, quae in congressu solemus: Quid tu, inquit, huc? Ne in odium veniam, si amicum destitero tueri. Post enim Chrysippum eum non sane est disputatum. Duarum enim vitarum nobis erunt instituta capienda. <mark>Quod quidem iam fit etiam in Academia.</mark> </p>

                    <ol>
                        <li>Cum enim summum bonum in voluptate ponat, negat infinito tempore aetatis voluptatem fieri maiorem quam finito atque modico.</li>
                        <li>Quam illa ardentis amores excitaret sui! Cur tandem?</li>
                        <li>Aeque enim contingit omnibus fidibus, ut incontentae sint.</li>
                        <li>Ergo illi intellegunt quid Epicurus dicat, ego non intellego?</li>
                    </ol>


                    <dl>
                        <dt><dfn>Numquam facies.</dfn></dt>
                        <dd>Quid ergo hoc loco intellegit honestum?</dd>
                        <dt><dfn>Venit ad extremum;</dfn></dt>
                        <dd>Quid sequatur, quid repugnet, vident.</dd>
                        <dt><dfn>Paria sunt igitur.</dfn></dt>
                        <dd>Quantum Aristoxeni ingenium consumptum videmus in musicis?</dd>
                        <dt><dfn>Facete M.</dfn></dt>
                        <dd>Quodsi vultum tibi, si incessum fingeres, quo gravior viderere, non esses tui similis;</dd>
                    </dl>


                    <pre>Eorum enim omnium multa praetermittentium, dum eligant
aliquid, quod sequantur, quasi curta sententia;

Quis enim potest ea, quae probabilia videantur ei, non
probare?</pre>


                    <blockquote cite="http://loripsum.net">
                        Et quae per vim oblatum stuprum volontaria morte lueret inventa est et qui interficeret filiam, ne stupraretur.
                    </blockquote>


                    <blockquote cite="http://loripsum.net">
                        Nec vero dico eorum metum mortis, qui, quia privari se vitae bonis arbitrentur, aut quia quasdam post mortem formidines extimescant, aut si metuant, ne cum dolore moriantur, idcirco mortem fugiant;
                    </blockquote>
                </CenterContainer>
            </Page>
        )
    }
}
